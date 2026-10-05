# 4Sports Golf

Independent golf site (player profiles, technique articles, equipment guides) built with Next.js 14, Tailwind CSS, and TypeScript.

## Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Fonts**: Playfair Display + Outfit (Google Fonts)
- **Deployment**: Vercel

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
  page.tsx                  # Homepage
  layout.tsx                # Root layout (header, footer, fonts)
  globals.css               # Global styles + Tailwind
  not-found.tsx             # 404 page
  sitemap.ts                # Auto-generated sitemap
  robots.ts                 # Robots.txt
  players/
    page.tsx                # Players index
    [slug]/page.tsx         # Individual player biography
  blog/
    page.tsx                # Blog index
    [slug]/page.tsx         # Individual blog post
  shop/
    page.tsx                # Equipment shop
components/
  Header.tsx
  Footer.tsx
lib/
  players.ts                # Player data + types
  posts.ts                  # Blog post data + types
  products.ts               # Shop product data + types
```

## Before deploying

1. **Amazon Associates tag** — search for `yourtag-21` in the codebase and replace with your actual tag:
   - `app/players/[slug]/page.tsx`
   - `app/shop/page.tsx`

2. **Domain** — update the base URL in `app/sitemap.ts` from `https://4sportsgolf.com` to your actual domain.

3. **Images** — currently using Unsplash placeholders. Replace with actual player photos in `lib/players.ts` and `lib/posts.ts`.

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repository directly in the Vercel dashboard for automatic deployments on every push.

## Adding Content

### New player
Add an entry to the `players` array in `lib/players.ts` following the `Player` type.

### New blog post
Add an entry to the `posts` array in `lib/posts.ts` following the `Post` type.

### New shop product
Add an entry to the `products` array in `lib/products.ts` following the `Product` type.

All pages are statically generated at build time via `generateStaticParams`.


## Content clean-up (Sept 2026)

The site went from ~3,770 generated pages to 446 (386 guides in /shop + 60 in /blog).

- `scripts/classify.py` decides KEEP / MERGE (301) / GONE (410) for every old URL, using topic rules and
  Google Search Console + Bing Webmaster Tools page data (any page with 5+ clicks was kept).
  Output: `scripts/out/classification.csv`.
- `scripts/apply_prune.py` writes the kept articles to `data/*.json` (with the keyword-stuffing clean-up from
  `scripts/destuff.py`) and generates `lib/prune/gone.json` and `lib/prune/redirects.json`.
  It reads the original data from `scripts/source/` (not committed — copy the old `data/*.json` there to re-run).
- `middleware.ts` answers 410 for removed pages, 301 for merged pages and for the legacy agency URLs
  (`/player-management/<player>/`) that Wikipedia still cites, and strips trailing slashes in one hop.
- Guides are grouped into 8 sections with hub pages at `/shop/category/<section>`.

To delete a guide later: remove it from `data/shop-articles.json` and add its path to `lib/prune/gone.json`
(or to `lib/prune/redirects.json` if a better page covers the same topic).


## Hand-written articles (Oct 2026)

Rewritten and new articles live as Markdown files in `content/articles/<slug>.md` with a JSON front matter block
(title, meta description, category, sources, FAQ, Amazon search links, optional `tool` and `redirectFrom`).
Run `python3 scripts/merge_content.py` after editing them: it writes them into `data/*.json`, removes the slug from
the 410 list and adds 301s for any `redirectFrom` paths. If you ever re-run `scripts/apply_prune.py`, run
`merge_content.py` again afterwards.

Interactive calculators live in `components/tools/` (handicap, golf cart range, simulator room size). An article embeds
one with `"tool": "<id>"` and the `[[tool]]` marker in its body.


## Images and backlinks

- `python3 scripts/add_images.py <folder>`: imports images named after keys in `content/images.json` (e.g. `img-21.png`),
  converts them to WebP in `public/images/articles/` and attaches them to the article. Then run `merge_content.py`.
- `python3 scripts/check_backlinks.py <semrush-backlinks.csv>`: checks every backlink target against the site and writes
  `scripts/out/backlink-targets.csv`. Add `--apply` to create 301s for removed/404 targets that have dofollow links.
- Legacy agency URLs: `/player-management/*` and any old URL mentioning Molinari, Pavan, Ramsay or Pepperell
  301 to the matching player profile (see `middleware.ts`).
