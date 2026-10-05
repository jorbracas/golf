#!/usr/bin/env python3
"""
Checks a backlink export (Semrush "Backlinks" CSV, or Ahrefs/Bing exports) against the current site so that
no URL with external links ends up as a 404/410.

  python3 scripts/check_backlinks.py <export.csv> [more.csv ...]          -> report only
  python3 scripts/check_backlinks.py --apply <export.csv> [...]           -> also adds suggested 301s

Writes scripts/out/backlink-targets.csv with one row per target URL:
  status: LIVE | REDIRECT | PLAYER-MGMT | GONE (410) | NOT-FOUND (404)
  suggested: best live page to 301 to (by keyword overlap), for GONE / NOT-FOUND rows
"""
import csv, json, os, re, sys
from collections import defaultdict
from urllib.parse import urlparse, unquote

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
apply = '--apply' in sys.argv
files = [f for f in sys.argv[1:] if f != '--apply']
if not files:
    sys.exit(__doc__)

shop = json.load(open(os.path.join(ROOT, 'data', 'shop-articles.json')))
blog = json.load(open(os.path.join(ROOT, 'data', 'blog-articles.json')))
live = {f'/shop/{a["slug"]}': a for a in shop} | {f'/blog/{a["slug"]}': a for a in blog}
static = {'/', '/shop', '/blog', '/players', '/about', '/disclosure', '/privacy', '/impressum', '/credits',
          '/players/edoardo-molinari', '/players/andrea-pavan', '/players/richie-ramsay', '/players/eddie-pepperell'}
static |= {f'/shop/category/{c}' for c in ['indoor-and-practice', 'clubs-and-shafts', 'golf-balls', 'bags-and-push-carts',
                                           'rangefinders-and-gps', 'apparel-and-shoes', 'accessories', 'golf-carts', 'golf-basics']}
red_p = os.path.join(ROOT, 'lib', 'prune', 'redirects.json')
gone_p = os.path.join(ROOT, 'lib', 'prune', 'gone.json')
redirects = json.load(open(red_p))
gone = set(json.load(open(gone_p)))

STOP = {'best', 'top', 'golf', 'the', 'a', 'an', 'for', 'of', 'to', 'and', 'in', 'on', 'with', 'how', 'guide', 'review',
        'shop', 'blog', 'buying', 'buyers', 'complete', 'html', 'php', 'www'}
def toks(s):
    return {w[:-1] if len(w) > 3 and w.endswith('s') else w for w in re.findall(r'[a-z0-9]+', s.lower()) if w not in STOP}
live_toks = {p: toks(p + ' ' + a['primaryKeyword'] + ' ' + a['title']) for p, a in live.items()}

PLAYERS = {'molinari': '/players/edoardo-molinari', 'pavan': '/players/andrea-pavan',
           'ramsay': '/players/richie-ramsay', 'ramsey': '/players/richie-ramsay', 'pepperell': '/players/eddie-pepperell'}

def suggest(path):
    for k, v in PLAYERS.items():
        if k in path.lower():
            return v
    t = toks(path)
    if not t:
        return '/'
    best, score = None, 0.0
    for p, lt in live_toks.items():
        j = len(t & lt) / len(t | lt)
        if j > score:
            best, score = p, j
    if best and score >= 0.25:
        return best
    if path.startswith('/shop/'):
        return '/shop'
    if path.startswith('/blog/'):
        return '/blog'
    return '/'

def norm(url):
    u = urlparse(url.strip())
    p = unquote(u.path).rstrip('/') or '/'
    return p, (u.netloc or '').lower()

targets = defaultdict(lambda: {'links': 0, 'dofollow': 0, 'best_score': 0, 'example_source': ''})
for f in files:
    with open(f, encoding='utf-8-sig') as fh:
        for r in csv.DictReader(fh):
            tgt = r.get('Target url') or r.get('Target URL') or r.get('target_url') or r.get('Target') or ''
            if '4sportsgolf' not in tgt:
                continue
            p, _ = norm(tgt)
            t = targets[p]
            t['links'] += 1
            nofollow = (r.get('Nofollow') or r.get('Nofollow ') or '').strip().lower() == 'true'
            t['dofollow'] += 0 if nofollow else 1
            try:
                sc = int(float(r.get('Page ascore') or r.get('Domain rating') or r.get('UR') or 0))
            except ValueError:
                sc = 0
            if sc >= t['best_score']:
                t['best_score'] = sc
                t['example_source'] = r.get('Source url') or r.get('Referring page URL') or r.get('Source URL') or ''

rows, added = [], 0
for p, t in sorted(targets.items(), key=lambda x: (-x[1]['best_score'], -x[1]['links'])):
    if p in live or p in static:
        status, sug = 'LIVE', ''
    elif p in redirects or p.lower() in redirects:
        status, sug = 'REDIRECT', redirects.get(p) or redirects.get(p.lower())
    elif p.lower().startswith('/player-management'):
        status, sug = 'PLAYER-MGMT', '/players (or the player page)'
    elif p in gone:
        status, sug = 'GONE (410)', suggest(p)
    else:
        status, sug = 'NOT-FOUND (404)', suggest(p)
    rows.append({'path': p, 'status': status, 'suggested_301': sug, **t})
    if apply and status.startswith(('GONE', 'NOT-FOUND')) and t['dofollow'] > 0:
        redirects[p] = sug
        gone.discard(p)
        added += 1

os.makedirs(os.path.join(ROOT, 'scripts', 'out'), exist_ok=True)
out = os.path.join(ROOT, 'scripts', 'out', 'backlink-targets.csv')
with open(out, 'w', newline='') as fh:
    w = csv.DictWriter(fh, fieldnames=['path', 'status', 'suggested_301', 'links', 'dofollow', 'best_score', 'example_source'])
    w.writeheader(); w.writerows(rows)

from collections import Counter
print(Counter(r['status'] for r in rows))
print('report:', out)
if apply:
    json.dump(redirects, open(red_p, 'w'), indent=0)
    json.dump(sorted(gone), open(gone_p, 'w'))
    print(f'added {added} redirects (dofollow targets only)')
