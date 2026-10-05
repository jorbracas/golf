#!/usr/bin/env python3
"""
Imports article images.

  python3 scripts/add_images.py <folder-with-images>

Each image file must be named after a key in content/images.json (e.g. cart-01.png / cart-01.jpg).
It is resized to max 1600 px wide, saved as public/images/articles/<slug>.webp (metadata stripped),
and the article's front matter gets image / imageAlt / imageWidth / imageHeight. Then run merge_content.py.
"""
import glob, json, os, re, sys
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MAP = json.load(open(os.path.join(ROOT, 'content', 'images.json')))
OUT = os.path.join(ROOT, 'public', 'images', 'articles')
os.makedirs(OUT, exist_ok=True)

def set_front_matter(slug, fields):
    path = os.path.join(ROOT, 'content', 'articles', f'{slug}.md')
    if not os.path.exists(path):
        # article not hand-written yet: store the image directly on the data record
        for sec in ('shop', 'blog'):
            dp = os.path.join(ROOT, 'data', f'{sec}-articles.json')
            data = json.load(open(dp))
            for a in data:
                if a['slug'] == slug:
                    a.update(fields)
                    json.dump(data, open(dp, 'w'), ensure_ascii=False)
                    return
        raise SystemExit(f'unknown slug {slug}')
    raw = open(path, encoding='utf-8').read()
    m = re.match(r'^---\s*\n(.*?)\n---\s*\n(.*)$', raw, re.S)
    meta = json.loads(m.group(1))
    meta.update(fields)
    open(path, 'w', encoding='utf-8').write('---\n' + json.dumps(meta, ensure_ascii=False, indent=2) + '\n---\n' + m.group(2))

def main(folder):
    done = []
    for f in sorted(glob.glob(os.path.join(folder, '*'))):
        key = os.path.splitext(os.path.basename(f))[0].lower()
        if key not in MAP:
            print('skip (not in content/images.json):', os.path.basename(f)); continue
        slug, alt = MAP[key]['slug'], MAP[key]['alt']
        im = Image.open(f).convert('RGB')
        if im.width > 1600:
            im = im.resize((1600, round(im.height * 1600 / im.width)), Image.LANCZOS)
        dest = os.path.join(OUT, f'{slug}.webp')
        im.save(dest, 'WEBP', quality=82, method=6)
        set_front_matter(slug, {'image': f'/images/articles/{slug}.webp', 'imageAlt': alt,
                                'imageWidth': im.width, 'imageHeight': im.height})
        done.append((key, slug, im.size, os.path.getsize(dest) // 1024))
    for d in done:
        print(f'{d[0]} -> {d[1]}  {d[2][0]}x{d[2][1]}  {d[3]} KB')

if __name__ == '__main__':
    main(sys.argv[1] if len(sys.argv) > 1 else '.')
