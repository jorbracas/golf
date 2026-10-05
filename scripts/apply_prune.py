#!/usr/bin/env python3
"""
Applies scripts/out/classification.csv to the site:
  - data/shop-articles.json / data/blog-articles.json  -> only KEEP pages, new categories, de-stuffed content
  - lib/prune/gone.json       -> paths answered with 410
  - lib/prune/redirects.json  -> 301 map (merged pages + player-management legacy URLs)
Originals are read from git HEAD~ snapshot copies in scripts/source/ so the script is re-runnable.
"""
import csv, json, os, re, shutil, sys
sys.path.insert(0, os.path.dirname(__file__))
from destuff import destuff, destuff_text

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'scripts', 'source')
os.makedirs(SRC, exist_ok=True)
for name in ('shop-articles.json', 'blog-articles.json'):
    if not os.path.exists(os.path.join(SRC, name)):
        shutil.copy(os.path.join(ROOT, 'data', name), os.path.join(SRC, name))

shop = json.load(open(os.path.join(SRC, 'shop-articles.json')))
blog = json.load(open(os.path.join(SRC, 'blog-articles.json')))
rows = {r['path']: r for r in csv.DictReader(open(os.path.join(ROOT, 'scripts', 'out', 'classification.csv')))}

BLOG_CATEGORY_MAP = {
    'Golf Carts': 'Golf Cart', 'Indoor & Practice': 'Technique', 'Clubs & Shafts': 'Maintenance',
}

def clean_title(t, kw):
    t = destuff_text(t, kw)
    t = re.sub(r'\s*[–—-]\s*(20\d\d)\b', '', t)          # drop "– 2025" year stuffing
    t = re.sub(r'\((20\d\d)[^)]*\)', '', t).strip()
    return re.sub(r'\s{2,}', ' ', t)

def process(arts, section):
    kept, stats = [], {}
    for a in arts:
        r = rows[f'/{section}/{a["slug"]}']
        if r['decision'] != 'KEEP':
            continue
        a = dict(a)
        content, st = destuff(a['content'], a['primaryKeyword'])
        for k, v in st.items():
            stats[k] = stats.get(k, 0) + v
        a['content'] = content
        a['title'] = clean_title(a['title'], a['primaryKeyword'])
        a['metaDescription'] = destuff_text(a['metaDescription'], a['primaryKeyword'])
        a['faq'] = [{'question': destuff_text(f['question'], a['primaryKeyword']),
                     'answer': destuff_text(f['answer'], a['primaryKeyword'])} for f in a.get('faq', [])]
        if section == 'shop':
            a['category'] = r['pillar'] or 'Golf Basics'
        else:
            if a['category'] == 'Disc Golf':
                a['category'] = 'How To'
        kept.append(a)
    return kept, stats

shop_kept, s1 = process(shop, 'shop')
blog_kept, s2 = process(blog, 'blog')
json.dump(shop_kept, open(os.path.join(ROOT, 'data', 'shop-articles.json'), 'w'), ensure_ascii=False)
json.dump(blog_kept, open(os.path.join(ROOT, 'data', 'blog-articles.json'), 'w'), ensure_ascii=False)

gone = sorted(p for p, r in rows.items() if r['decision'] == 'GONE')
redirects = {p: r['target'] for p, r in rows.items() if r['decision'] == 'MERGE'}

# Legacy agency URLs cited by Wikipedia and old press releases
legacy_players = {
    'edoardo-molinari': 'edoardo-molinari',
    'andrea-pavan': 'andrea-pavan',
    'richie-ramsay': 'richie-ramsay',
    'richie-ramsey': 'richie-ramsay',
    'eddie-pepperell': 'eddie-pepperell',
}
for old, new in legacy_players.items():
    redirects[f'/player-management/{old}'] = f'/players/{new}'
redirects['/player-management'] = '/players'
redirects['/players/richie-ramsey'] = '/players/richie-ramsay'

os.makedirs(os.path.join(ROOT, 'lib', 'prune'), exist_ok=True)
json.dump(gone, open(os.path.join(ROOT, 'lib', 'prune', 'gone.json'), 'w'))
json.dump(redirects, open(os.path.join(ROOT, 'lib', 'prune', 'redirects.json'), 'w'), indent=0)

print('shop kept', len(shop_kept), 'blog kept', len(blog_kept), 'gone', len(gone), 'redirects', len(redirects))
print('destuff shop', s1)
print('destuff blog', s2)
