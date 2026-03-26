# 4Sports Golf

Professional golf management website built with Next.js 14, Tailwind CSS, and TypeScript.

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
