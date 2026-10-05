#!/usr/bin/env python3
"""
Clasifica todas las páginas /shop y /blog en KEEP / MERGE (301) / GONE (410).

Entradas:
  data/shop-articles.json, data/blog-articles.json
  ../gsc/Páginas.csv            (Google Search Console, opcional)
  ../gsc/bing-pages.csv         (Bing Webmaster Tools, opcional)
Salidas:
  scripts/out/classification.csv   una fila por URL con decisión y motivo
"""
import csv, json, math, os, re, sys
from collections import defaultdict, Counter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GSC_DIR = os.environ.get('GSC_DIR', '/home/claude/gsc')
OUT = os.path.join(ROOT, 'scripts', 'out')
os.makedirs(OUT, exist_ok=True)

shop = json.load(open(os.path.join(ROOT, 'data/shop-articles.json')))
blog = json.load(open(os.path.join(ROOT, 'data/blog-articles.json')))

# ---------------------------------------------------------------- traffic data
def load_traffic():
    t = defaultdict(lambda: {'g_clicks': 0, 'g_impr': 0, 'g_pos': None, 'b_clicks': 0, 'b_impr': 0})
    p = os.path.join(GSC_DIR, 'Páginas.csv')
    if os.path.exists(p):
        for r in csv.DictReader(open(p, encoding='utf-8')):
            path = re.sub(r'^https?://[^/]+', '', r['Páginas principales']).rstrip('/') or '/'
            t[path]['g_clicks'] += int(r['Clics'])
            t[path]['g_impr'] += int(r['Impresiones'])
            t[path]['g_pos'] = float(r['Posición'].replace(',', '.'))
    for name in os.listdir(GSC_DIR):
        if name.lower().startswith('bing') and name.endswith('.csv'):
            for r in csv.DictReader(open(os.path.join(GSC_DIR, name), encoding='utf-8-sig')):
                url = r.get('Page') or r.get('URL') or r.get('Pages') or ''
                path = re.sub(r'^https?://[^/]+', '', url).rstrip('/') or '/'
                t[path]['b_clicks'] += int(float(r.get('Clicks', 0) or 0))
                t[path]['b_impr'] += int(float(r.get('Impressions', 0) or 0))
    return t

traffic = load_traffic()

# ---------------------------------------------------------------- rules
STATES = ('alabama alaska arizona arkansas california colorado connecticut delaware florida georgia hawaii idaho '
          'illinois indiana iowa kansas kentucky louisiana maine maryland massachusetts michigan minnesota '
          'mississippi missouri montana nebraska nevada ohio oklahoma oregon pennsylvania tennessee texas utah '
          'vermont virginia wisconsin wyoming carolina dakota hampshire jersey mexico york').split()
STATE_ABBR = 'al ak az ar ca co ct de fl ga hi id il in ia ks ky la me md ma mi mn ms mo mt ne nv nh nj nm ny nc nd oh ok or pa ri sc sd tn tx ut vt va wa wv wi wy dc'.split()
CITIES = [c.strip() for c in (
    'nyc,boston,chicago,houston,dallas,austin,phoenix,denver,atlanta,miami,tampa,orlando,seattle,portland,akron,'
    'paramus,fresno,spokane,scottsdale,myrtle beach,naples,las vegas,vegas,lubbock,knoxville,lafayette,tomball,'
    'new braunfels,st augustine,murrells inlet,cincinnati,raleigh,charlotte,nashville,memphis,louisville,'
    'indianapolis,columbus,cleveland,milwaukee,minneapolis,omaha,tulsa,wichita,albuquerque,tucson,sacramento,'
    'san diego,san francisco,san jose,oakland,los angeles,marin county,san rafael,benton harbor,dauphin island,'
    'branson,davenport,plant city,bolingbrook,burnsville,overland park,wesley chapel,des moines,monmouth county,'
    'panama city,rome,italy,ireland,scotland,dubai,hilton head,sarasota,destin,pensacola,jacksonville,savannah,'
    'charleston,kiawah,pinehurst,williamsburg,richmond,pittsburgh,philadelphia,baltimore,rochester,syracuse,'
    'albany,hartford,providence,brainerd,springfield,henderson,reno,boise,anchorage,honolulu,ocala,the villages,'
    'gulf shores,galveston,corpus christi,san antonio,el paso,fort worth,plano,frisco,katy,sugar land,'
    'the woodlands,conroe,tallahassee,gainesville,lakeland,kissimmee,clearwater,st petersburg,bradenton,'
    'fort myers,cape coral,boca raton,palm beach,fort lauderdale,tempe,chandler,glendale,flagstaff,sedona,'
    'lake havasu,oceanside,carlsbad,temecula,palm springs,la quinta,big bear,harrisville,hansen dam,'
    'poppy hills,mountain brook,ella sharp,los lagos,grand cypress,wisconsin dells,deep creek,oakhurst,'
    'hershey,poconos,muskoka,toronto,vancouver,calgary,edmonton,london,dublin,sydney,melbourne,auckland,'
    'block island,midwest,catalina,key west,lake tahoe,cape cod,outer banks,hilton,bend oregon,st louis,'
    'kansas city,oklahoma city,salt lake,virginia beach,new orleans,baton rouge,birmingham,huntsville,mobile al'
).split(',')]
GEO_RE = re.compile(r'\b(' + '|'.join(sorted(set(STATES + CITIES), key=len, reverse=True)) + r')\b')
ABBR_RE = re.compile(r'\b(' + '|'.join(STATE_ABBR) + r')$')  # state abbr at end of keyword ("golf carts houston tx")

SERVICE_RE = re.compile(r'\b(lessons?|class(es)?|instructors?|instruction|schools?|academy|camps?|clinics?|rentals?|rent|'
                        r'tournaments?|outings?|expo|association|jobs?|careers?|coupons?|tee times?|scorecards?|'
                        r'resorts?|packages?|stay and play|trips?|vacations?|communit(y|ies)|hall of fame|'
                        r'accidents?|lawyers?|attorneys?|insurance|licen[cs]e|laws?|legal|parade|forums?|junkyard|'
                        r'dealers?|dealership|for sale|near me|franchise|membership|country club|'
                        r'course|courses|championship|us open|the masters|masters golf|pga|lpga|liv golf|ryder|'
                        r'solheim|pga tour|european tour|dp world tour|tour schedule|leaderboard|tickets?|live stream|tv schedule|standings|odds|'
                        r'repair shop|service near|mobile .* service|tours? at night|bucket list|longest day|'
                        r'hotel|lodging|restaurant|bar\b|pub\b|brewery|wedding|party|bachelor|birthday)\b')
NOVELTY_RE = re.compile(r'\b(funny|puns?|jokes?|names?|captions?|quotes?|sayings|greeting cards?|memes?|'
                        r'crazy golf|mini(ature)? golf|putt putt|disc golf|frisbee|topgolf|top golf|neon|'
                        r'glassware|costumes?|halloween|christmas|tattoo|wallpaper|drawing|clipart|coloring|'
                        r'cake|cookies?|cupcakes?|decor|headlines?|yearbook|trivia|games? for|board game|'
                        r'video game|mario|wii|xbox|playstation|nintendo|ps5|arcade|poem|song|movie|'
                        r'inappropriate|launcher|ar 15|guns?|beach game|dad golf|humorous|pittosporum|presents|cps golf|logos?|1950s|campgrounds|dustin johnson|sponsorship|disk golf|become a pro|sexy|hooters|drinking|beer|shot glass|flask|cannon|'
                        r'labubu|batman|star wars|disney|marvel|pokemon|snoopy|peanuts|simpsons|'
                        r'massage|trigger finger|injur(y|ies)|elbow|back pain|workout|exercises?)\b')
TEAMS_RE = re.compile(r'\b(nfl|nba|mlb|nhl|ncaa|yankees|mets|red sox|cubs|dodgers|patriots|eagles|cowboys|packers|steelers|'
                      r'bills|chiefs|49ers|bears|lions|vikings|saints|ravens|broncos|seahawks|raiders|jets|giants|'
                      r'lakers|celtics|warriors|bulls|knicks|heat|notre dame|ohio state|texas tech|gators|lsu|wvu|'
                      r'usmc|marines|army|navy|air force|vols|volunteers|alabama|clemson|michigan|georgia|'
                      r'tar heels|duke|kansas|auburn|oklahoma|longhorns|buckeyes|wolverines|crimson|seminoles|'
                      r'hurricanes|detroit|nebraska|husker|razorback|sooners|hokies|wildcats|tigers|bulldogs|'
                      r'netjets|steph curry|kevin harvick|megan mappin|tiger woods|rory|scheffler|'
                      r'bryson|rickie|phil mickelson|jordan spieth|brooks koepka|happy gilmore|caddyshack|'
                      r'american flag|usa flag|camo|camouflage)\b')
NON_EN_RE = re.compile(r'\b(carros?|de golf|en venta|para|pelotas|palos|bolsa|zapatos|golfschl|golfball)\b')
YEAR_MODEL_RE = re.compile(r'\b(19[5-9]\d|200\d|201\d)\b')  # "2006 yamaha golf cart"

COLOR_RE = re.compile(r'\b(red|blue|pink|black|gray|grey|orange|purple|green|yellow|white|brown|navy|tan|gold|silver|'
                      r'neon|pastel|floral|plaid|argyle|leopard|tie dye|striped?)\b')

# Pillars: (new category, regex). First match wins.
PILLARS = [
    ('Indoor & Practice', r'launch monitor|simulator|\bsim\b|hitting (net|mat|cage|bay)|practice (net|mat|green|ball)|'
                          r'putting (green|mat|trainer|aid|system|cup|indoors?)|indoor golf (mat|net)|golf net|'
                          r'netting|chipping (net|target)|swing (trainer|analy[sz]er|aid|plane|speed (trainer|tracker|radar))|training aids?|'
                          r'alignment sticks?|impact tape|golf mat|backyard putting|artificial turf|net return|'
                          r'golf practice|golf enclosure|hitting enclosure|simulator enclosure|impact screen|golf screen|foresight|skytrak|rapsodo|garmin r10|mevo|uneekor|trackman|gc quad'),
    ('Golf Carts', r'golf (cart|car|buggy|buggies)s?\b|club car|ezgo|e-z-go|yamaha drive|cushman|evolution cart|icon cart'),
    ('Rangefinders & GPS', r'rangefinder|range finder|golf gps|gps (watch|app|device)|golf watch|golf speaker gps|'
                           r'distance measur|bushnell|voice caddie|golf buddy'),
    ('Bags & Push Carts', r'golf bags?|stand bag|cart bag|travel bag|travel case|sunday bag|pencil bag|carry bag|'
                          r'push (cart|trolley)|pull (cart|trolley)|golf trolley|electric (trolley|caddy)|'
                          r'caddy|bag cooler|bag (organi[sz]er|tags?|stand|rack|holder|storage)|'
                          r'golf bag'),
    ('Accessories', r'tees?\b|ball markers?|markers?|divot|towels?|head ?covers?|umbrellas?|scorecard holder|'
                    r'ball (retriever|grabber|pick ?up)|pitch ?mark|repair tool|gifts?|accessor|brush|groove cleaner|'
                    r'cleaning|clean|ball washer|tee holder|golf pencils?|ball (liner|line|stamp)|cooling towel|'
                    r'hand warmers?|scorecard|stroke counter|cooler'),
    ('Apparel & Shoes', r'shoes?|spikes?|cleats?|gloves?|shirts?|polos?|shorts|pants|trousers|skirts?|skorts?|'
                        r'dress(es)?|jackets?|vests?|hoodies?|sweaters?|pullovers?|quarter zip|rain (gear|suit|jacket)|'
                        r'waterproofs?|hats?|caps?|visors?|beanies?|socks|belts?|base ?layer|sleeves|outerwear|'
                        r'apparel|clothing|attire|outfits?|loafers|sunglasses|windbreaker|body warmer|gilet'),
    ('Golf Balls', r'golf balls?\b|pro v1|chrome soft|tour bx|tp5|srixon|vice pro|kirkland|snell|maxfli'),
    ('Clubs & Shafts', r'driver|irons?\b|wedges?|putters?|hybrids?|fairway woods?|woods?\b|shafts?|grips?\b|'
                       r'club sets?|golf sets?|\bsets? review|golf clubs?|golf set|complete set|loft|lie angle|bounce|kick point|flex|'
                       r'regroove|reshaft|club fitting|clubhead|club head'),
]
PILLAR_RES = [(n, re.compile(r'\b(' + p + r')')) for n, p in PILLARS]

CAPS = {
    'Indoor & Practice': 60,
    'Golf Balls': 38,
    'Clubs & Shafts': 70,
    'Bags & Push Carts': 35,
    'Apparel & Shoes': 55,
    'Accessories': 40,
    'Rangefinders & GPS': 20,
    'Golf Carts': 40,
}
BLOG_CAP = 60

AUDIENCE_RE = re.compile(r'\b(seniors?|beginners?|women|womens|ladies|lady|kids|junior|youth|men|mens|high handicap(pers?)?|'
                         r'slow swing|swing speed|left handed|lefty|tall|budget|cheap|under \$?\d+|forgiving|forgiveness|'
                         r'distance|spin|soft|mid handicap|walking|travel|lightweight|waterproof|lithium|48v|48 volt|36v)\b')
GOLF_CART_CORE_RE = re.compile(r'batter(y|ies)|charger|lithium|enclosure|cover|seat|lift kit|tires?|rims?|wheels?|'
                               r'light|led|speaker|radio|sound|windshield|mirror|cooler|rear seat|steering|'
                               r'accessor|bag holder|cup holder|dash|horn|turn signal|brake|motor|controller|'
                               r'solenoid|speed|voltage|maintenance|how long|how fast|dimensions|how much|worth|'
                               r'mat|floor|hitch|storage|basket|rack|club car|ezgo|yamaha|electric|gas')

BRAND_MODEL_RE = re.compile(r'\b(adams|nike|sldr|epon|vega|lynx|dixon|diablo|bunn|mg golf|linksmaster|stitch|izzo|'
                            r'miura|honma|xxio|dunlop|ram golf|tommy armour|top flite|pinemeadow|intech|'
                            r'speedline|hibore|vapor|ap2|ad333|straightfli|4orged|adipower|air max|boss golf|shark)\b')

STOP = set('best top guide review reviews the a an for of to and in on with your you how what is are do does why which '
           'buy buying new 2023 2024 2025 2026 complete ultimate'.split())

def stem(w):
    if len(w) > 4 and w.endswith('ies'): return w[:-3] + 'y'
    if len(w) > 3 and w.endswith('es') and w[-3] in 'sxz': return w[:-2]
    if len(w) > 3 and w.endswith('s') and not w.endswith('ss'): return w[:-1]
    return w

def tokens(k):
    k = k.lower().replace("women's", 'women').replace("men's", 'men').replace('ladies', 'women').replace('lady', 'women')
    k = k.replace('womens', 'women').replace('mens', 'men')
    return frozenset(stem(w) for w in re.findall(r"[a-z0-9]+", k) if w not in STOP)

def pillar_of(kw):
    for n, r in PILLAR_RES:
        if r.search(kw):
            return n
    return None

def hard_reject(kw, slug):
    k = kw.lower()
    s = slug.replace('-', ' ')
    if NON_EN_RE.search(k): return 'non-English'
    if YEAR_MODEL_RE.search(k): return 'year/model variant'
    if TEAMS_RE.search(k): return 'team/celebrity/licensed'
    if NOVELTY_RE.search(k): return 'novelty/off-topic'
    if SERVICE_RE.search(k) or SERVICE_RE.search(s): return 'local/service/event intent'
    if GEO_RE.search(k) or GEO_RE.search(s) or ABBR_RE.search(k.strip()): return 'local/geo intent'
    return None

def score(a, path, pillar):
    k = a['primaryKeyword'].lower()
    tr = traffic.get(path, {'g_clicks': 0, 'g_impr': 0, 'g_pos': None, 'b_clicks': 0, 'b_impr': 0})
    sc = 0.0
    sc += 3.0 * math.log1p(tr['g_impr']) + 10 * tr['g_clicks']
    sc += 3.0 * math.log1p(tr['b_impr']) + 10 * tr['b_clicks']
    if tr['g_pos'] and tr['g_pos'] <= 30: sc += 6
    n = len(tokens(k))
    sc -= 1.5 * max(0, n - 3)                 # long-tail penalty
    if AUDIENCE_RE.search(k): sc += 4         # clear buyer intent segment
    if k.startswith('best ') or a['slug'].startswith('best-'): sc += 1
    if COLOR_RE.search(k): sc -= 4
    if BRAND_MODEL_RE.search(k): sc -= 5
    if pillar == 'Golf Carts':
        sc += 3 if GOLF_CART_CORE_RE.search(k) else -8
    if re.match(r'^(what|why|who|when|where|can|do|does|is|are|should)\b', k): sc -= 2
    return sc

# ---------------------------------------------------------------- classify
rows = []   # dicts: section, slug, path, keyword, old_cat, pillar, decision, target, reason, g_clicks, g_impr
def tr_of(path):
    return traffic.get(path, {'g_clicks': 0, 'g_impr': 0, 'b_clicks': 0, 'b_impr': 0})

candidates = defaultdict(list)
for section, arts in (('shop', shop), ('blog', blog)):
    for a in arts:
        path = f'/{section}/{a["slug"]}'
        kw = a['primaryKeyword']
        pil = pillar_of(kw.lower()) or pillar_of(a['slug'].replace('-', ' '))
        rej = hard_reject(kw, a['slug'])
        row = dict(section=section, slug=a['slug'], path=path, keyword=kw, old_cat=a['category'], pillar=pil or '',
                   decision='', target='', reason='', **{k: tr_of(path).get(k, 0) for k in ('g_clicks', 'g_impr', 'b_clicks', 'b_impr')})
        if rej:
            row.update(decision='GONE', reason=rej)
        elif section == 'shop' and not pil:
            row.update(decision='GONE', reason='off-topic (no product pillar)')
        else:
            row['_score'] = score(a, path, pil if section == 'shop' else 'blog')
            candidates[('blog' if section == 'blog' else pil)].append(row)
        rows.append(row)

# within each pillar: dedupe by token set, then cap by score
for group, lst in candidates.items():
    lst.sort(key=lambda r: -r['_score'])
    seen = {}
    uniques = []
    for r in lst:
        t = tokens(r['keyword'])
        if t in seen:
            r.update(decision='MERGE', target=seen[t]['path'], reason='duplicate keyword (plural/variant)')
        else:
            seen[t] = r
            uniques.append(r)
    cap = BLOG_CAP if group == 'blog' else CAPS[group]
    kept = uniques[:cap]
    for r in kept:
        r.update(decision='KEEP', reason='core page')
    # overflow: 301 to most similar kept page when overlap is strong, else 410
    for r in uniques[cap:]:
        t = tokens(r['keyword'])
        best, bj = None, 0
        for k in kept:
            kt = tokens(k['keyword'])
            j = len(t & kt) / len(t | kt)
            if j > bj:
                best, bj = k, j
        if best and bj >= 0.6:
            r.update(decision='MERGE', target=best['path'], reason=f'near-duplicate of kept page (J={bj:.2f})')
        else:
            r.update(decision='GONE', reason='below cut (long-tail / thin)')

# protect pages with real traffic
#  - >=5 clicks (Google+Bing): keep whatever it is, flagged for later review if off-pillar
#  - 1-4 clicks: keep if it sits in a pillar and was not hard-rejected
for r in rows:
    clicks = int(r['g_clicks']) + int(r['b_clicks'])
    if r['decision'] == 'KEEP' or clicks == 0:
        continue
    if clicks >= 5:
        r.update(decision='KEEP', target='', reason='protected: traffic (>=5 clicks)' + ('' if r['pillar'] else ' - review later'))
    elif r['pillar'] and not r['reason'].startswith(('local', 'non-English', 'team', 'novelty', 'year')):
        r.update(decision='KEEP', target='', reason='protected: has clicks')

# resolve merge chains (target must be KEEP)
by_path = {r['path']: r for r in rows}
for r in rows:
    if r['decision'] == 'MERGE':
        t = by_path.get(r['target'])
        while t and t['decision'] == 'MERGE':
            t = by_path.get(t['target'])
        if not t or t['decision'] != 'KEEP':
            r.update(decision='GONE', target='', reason=r['reason'] + ' (target not kept)')
        else:
            r['target'] = t['path']

with open(os.path.join(OUT, 'classification.csv'), 'w', newline='') as f:
    cols = ['section', 'path', 'keyword', 'old_cat', 'pillar', 'decision', 'target', 'reason', 'g_clicks', 'g_impr', 'b_clicks', 'b_impr']
    w = csv.DictWriter(f, fieldnames=cols, extrasaction='ignore')
    w.writeheader()
    for r in sorted(rows, key=lambda r: (r['decision'], r['pillar'], r['path'])):
        w.writerow(r)

c = Counter((r['section'], r['decision']) for r in rows)
print(c)
print(Counter(r['pillar'] for r in rows if r['decision'] == 'KEEP' and r['section'] == 'shop'))
print(Counter(r['reason'] for r in rows if r['decision'] == 'GONE').most_common())
