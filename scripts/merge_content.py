#!/usr/bin/env python3
"""
Merges hand-written articles from content/articles/*.md into data/shop-articles.json and
data/blog-articles.json (replacing an existing slug or adding a new one), and un-410s any
slug that was previously pruned.

File format:
    ---
    { JSON front matter: slug, section ("shop"|"blog"), title, metaDescription, primaryKeyword,
      category, date, updated, tool?, related?[], sources?[[label,url]], amazon?[[anchor, search terms]],
      faq?[{question, answer}], redirectFrom?[old paths] }
    ---
    markdown body
"""
import glob, json, math, os, re, sys
from urllib.parse import quote_plus

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AMAZON_TAG = 'dronewithca0b-20'

def amazon_url(terms):
    return f'https://www.amazon.com/s?k={quote_plus(terms)}&tag={AMAZON_TAG}'

def load(path):
    raw = open(path, encoding='utf-8').read()
    m = re.match(r'^---\s*\n(.*?)\n---\s*\n(.*)$', raw, re.S)
    if not m:
        sys.exit(f'bad front matter: {path}')
    meta = json.loads(m.group(1))
    body = m.group(2).strip() + '\n'
    words = len(re.findall(r"\w+", body)) + sum(len(re.findall(r"\w+", f['answer'])) for f in meta.get('faq', []))
    art = {
        'slug': meta['slug'],
        'title': meta['title'],
        'metaDescription': meta['metaDescription'],
        'content': body,
        'primaryKeyword': meta['primaryKeyword'],
        'category': meta['category'],
        'date': meta['date'],
        'updated': meta.get('updated', meta['date']),
        'readTime': f"{max(2, math.ceil(words / 230))} min",
        'faq': meta.get('faq', []),
        'amazonLinks': [[a, amazon_url(t)] for a, t in meta.get('amazon', [])],
    }
    for k in ('tool', 'related', 'sources', 'image', 'imageAlt', 'imageWidth', 'imageHeight'):
        if meta.get(k):
            art[k] = meta[k]
    return meta['section'], art, meta.get('redirectFrom', [])

def main():
    files = sorted(glob.glob(os.path.join(ROOT, 'content', 'articles', '*.md')))
    data = {s: json.load(open(os.path.join(ROOT, 'data', f'{s}-articles.json'))) for s in ('shop', 'blog')}
    gone_p = os.path.join(ROOT, 'lib', 'prune', 'gone.json')
    red_p = os.path.join(ROOT, 'lib', 'prune', 'redirects.json')
    gone = set(json.load(open(gone_p)))
    redirects = json.load(open(red_p))
    added = replaced = 0
    for f in files:
        section, art, redirect_from = load(f)
        path = f'/{section}/{art["slug"]}'
        lst = data[section]
        idx = next((i for i, a in enumerate(lst) if a['slug'] == art['slug']), None)
        if idx is None:
            lst.append(art); added += 1
        else:
            lst[idx] = art; replaced += 1
        gone.discard(path)
        redirects.pop(path, None)
        for old in redirect_from:
            gone.discard(old)
            redirects[old] = path
    # keep redirect targets valid: anything pointing at a path that is now gone -> drop
    live = {f'/shop/{a["slug"]}' for a in data['shop']} | {f'/blog/{a["slug"]}' for a in data['blog']}
    redirects = {k: v for k, v in redirects.items() if v in live or not v.startswith(('/shop/', '/blog/'))}
    for s in ('shop', 'blog'):
        json.dump(data[s], open(os.path.join(ROOT, 'data', f'{s}-articles.json'), 'w'), ensure_ascii=False)
    json.dump(sorted(gone), open(gone_p, 'w'))
    json.dump(redirects, open(red_p, 'w'), indent=0)
    print(f'{len(files)} files: {replaced} replaced, {added} added; shop={len(data["shop"])} blog={len(data["blog"])}')

if __name__ == '__main__':
    main()
