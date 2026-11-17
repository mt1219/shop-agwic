markdown

# Project Stack & Setup — AGWIC (ShopAgwic)

A reference for recreating this setup on a new project. The stack, the
services, the configuration choices, and the conventions worth keeping.

---

## Services / Vendors

**Supabase** — backend as a service

- Postgres database (8 tables, RLS on every table, RPCs for stats)
- Storage (public bucket `product-images`, authenticated write)
- Auth (email/password, session cookies via `@supabase/ssr`)
- Used for: data, images, admin auth, review moderation, event tracking

**Vercel** — hosting and deployment

- Connected to GitHub repo, auto-deploys on push to `main`
- Custom domain `shopagwic.com` + `www.shopagwic.com`
- `www` is the canonical domain; apex redirects to `www` (Vercel default)
- Environment variables set in Vercel dashboard
- Note: Vercel injects `npm_config_cache_dir` which triggers an npm warning — harmless, cannot be fixed on our end

**GitHub** — source control

- Repo: `mt1219/shop-agwic`
- Local branch `main`, pushes to `origin main`

**DeepSeek** — AI for support chat

- `deepseek-flash` model (the current model; `deepseek-chat` is legacy)
- API key in `DEEPSEEK_API_KEY` env var
- Cost: ~$0.14 per million input tokens, ~$0.28 per million output

**Google Search Console** — SEO

- Property: `https://www.shopagwic.com`
- HTML tag verification (meta tag in `layout.tsx`)
- Sitemap submitted

**Resend** — email (not yet integrated; tables ready)

- Will be used for: order confirmations, contact replies, newsletters, ebook delivery

---

## Framework & Libraries

**Next.js 16 (App Router)** — the framework

- React Server Components for data fetching
- Server Actions for mutations
- Route groups, dynamic segments (`[slug]`, `[page]`)
- `next/font` for fonts (Inter + Fraunces, no runtime Google request)
- Turbopack for dev (fall back to `--webpack` if `next/font` errors)
- **Cache Components** enabled — `Date.now()`, `Math.random()`, and URL params must be handled carefully in prerendered routes (see Debugging Lessons)

**Tailwind CSS v4** — styling

- Configuration in CSS, not `tailwind.config.js`
- `@theme inline` in `styles/global.css` maps CSS vars to utilities
- Palette tokens: `--color-page`, `--color-surface`, `--color-ink`,
  `--color-ink-muted`, `--color-accent`, `--color-border`, `--color-stripe`,
  `--color-primary`, `--color-primary-ink`, `--color-warning`
- Theme system: `[data-theme]` on `<html>`, default theme in `:root`
- Four alternate themes ready (`winter-holiday`, `summer`, `fall`, `midnight`) — not yet wired to a switcher

**TypeScript** — strict mode

- Product types in `lib/products/types.ts`
- Category slugs derived from `lib/categories.ts` via `as const` — adding a category auto-updates the union

**`@supabase/ssr`** — Supabase client for Next.js

- `createBrowserClient` for client components
- `createServerClient` + `cookies()` for server components and actions
- Session cookie handling in `proxy.ts` (Next 16 convention, formerly `middleware.ts`)

**`zod`** — schema validation for server actions (used in review submission)

**`dotenv`** — loads `.env.local` for standalone scripts (`seed-reviews.ts`)

**`tsx`** — runs TypeScript scripts

---

## Project Structure

project-root/
├── app/
│ ├── layout.tsx # Root layout (fonts, Header, Footer, RouteTracker, SupportButton)
│ ├── page.tsx # Homepage (hero, departments, featured, trust strip)
│ ├── shop/page.tsx # Product grid + sort (desktop links, mobile pills)
│ ├── product/[slug]/ # Product detail
│ │ ├── page.tsx # Shell + generateMetadata + generateStaticParams
│ │ └── actions.ts # submitReview server action
│ ├── cart/page.tsx # Cookie-backed cart
│ ├── bought/page.tsx # Buy confirmation (per-product + per-cart jokes)
│ ├── about/page.tsx
│ ├── careers/page.tsx
│ ├── press/page.tsx
│ ├── contact/page.tsx # Frustrating contact page, chat CTA
│ ├── faq/page.tsx
│ ├── legal/[page]/page.tsx # Terms, privacy, cookies, accessibility
│ ├── admin/
│ │ ├── layout.tsx # Admin shell (sidebar, sign out)
│ │ ├── page.tsx # Dashboard
│ │ ├── login/ # page.tsx, LoginForm.tsx, PasswordField.tsx, actions.ts
│ │ ├── logout/route.ts # POST endpoint
│ │ ├── analytics/page.tsx # Event dashboard with 1/7/30/90 day filter
│ │ └── reviews/ # Content Review Queue
│ │ ├── page.tsx
│ │ ├── ReviewRow.tsx
│ │ └── actions.ts # approve, return, escalate, delete, addComment
│ └── api/
│ ├── track/route.ts # Batched event ingestion
│ └── support/route.ts # DeepSeek proxy
├── components/
│ ├── layout/ # Header, Footer, SearchBar, CartBadge
│ ├── product/ # ProductDetail + 9 children
│ ├── cart/CartLine.tsx
│ ├── shop/SortSelectMobile.tsx
│ ├── support/ # SupportButton, SupportChat
│ ├── RouteTracker.tsx
│ ├── PageViewTracker.tsx
│ └── TrackedLink.tsx
├── lib/
│ ├── categories.ts # 8 departments, CategorySlug union derived
│ ├── products/
│ │ ├── types.ts # Product type
│ │ ├── index.ts # Registry, imports year barrels
│ │ ├── \_template.ts # Product template
│ │ └── items/
│ │ └── 2026/ # Product files for 2026
│ │ ├── index.ts # Barrel
│ │ └── \*.ts # One file per product
│ ├── buy-messages.ts # Per-product + per-cart jokes
│ ├── cart.ts # Cookie read/write
│ ├── images.ts # productImageUrl, formatPrice
│ ├── reviews.ts # getApprovedReviews (server-side)
│ ├── track-click.ts # Event buffering, session ID, flush
│ ├── purchase/
│ │ ├── actions.ts # addToCart, remove, updateQty, clearCart, buyCart, buyNow
│ │ └── record.ts # recordStat (RPC wrapper)
│ ├── support-prompt.ts # The Customer Success Specialist persona
│ └── legal/ # terms, privacy, cookies, accessibility + index
├── styles/global.css # Tailwind v4 entry + @theme + themes
├── proxy.ts # Auth middleware, /admin gate
├── scripts/
│ ├── seed-reviews.ts # Idempotent seed from product files
│ └── env.ts # Loads .env.local for scripts
└── supabase/migrations/
├── 0001_init.sql # product_images, product_stats, reviews, storage, RPCs
├── 0002_events.sql # events table + RLS
├── 0003_email.sql # contact_submissions, product_requests, email_signups, emails, log_email
└── 0004_explicit_grants.sql # Explicit GRANTs (required for projects created after May 2026)

text

**One CSS file.** `styles/global.css` is the only global stylesheet. Do not create a second one.

**Products are code, not DB rows.** One file per product in `lib/products/items/<year>/`. Barrel per year. Top-level `index.ts` concatenates. Images go in Supabase Storage, referenced by path in the product file and by `product_images` rows in the DB.

**Folders are chronology, fields are taxonomy.** The product file's location (`items/2026/`) is "when it was added." The `category` field drives everything user-visible. Moving a file doesn't change the store; changing `category` does.

---

## Data Model

### `product_images`

id uuid pk, product_slug text, storage_path text, alt text,
sort_order int, is_hero bool, created_at

text
RLS: public read, authenticated write. Mirrors the `gallery_images` pattern.

### `product_stats`

product_slug pk, add_to_cart_count int, purchase_count int,
last_added_at, last_purchased_at, avg_rating numeric, review_count int, updated_at

text
Updated by `bump_stat` and `recompute_review_stats` RPCs. Never manually edited.

### `reviews`

id uuid pk, product_slug text, author_name text, rating int (1-5, nullable),
title text, body text, is_seed bool default false, verified_purchase bool default false,
helpful_count int default 0, status text default 'PENDING_REVIEW',
admin_comment text, admin_commented_at timestamptz, created_at

text
Status values: `PENDING_REVIEW`, `APPROVED`, `RETURNED`, `ESCALATED`.
RLS: public insert, public read only where `status = 'APPROVED'`.
**No `published` column** — `status` is the single source of truth.
`recompute_review_stats` runs after approve/delete to update `product_stats`.

### `events`

id uuid pk, event_name text, page text, product_slug text, category text,
session_id text, referrer text, ip_hash text, metadata jsonb, created_at

text
RLS: public insert only. Reads via service role.
Fired by `RouteTracker` and `trackClick`. `/admin/*` and `/api/*` are excluded.
Used by `/admin/analytics` (1/7/30/90 day ranges).

### Email foundation (tables exist, features not yet built)

- `contact_submissions` — contact form entries
- `product_requests` — visitor asks for a product
- `email_signups` — the email list (unique on email, `source` field, `unsubscribed_at`)
- `emails` — log of every email sent (to, from, subject, template, resend_id, status, metadata)
- `log_email(...)` RPC

### Storage

- Bucket `product-images`: public read, authenticated write
- One folder per product slug (`the-original-cork/hero.webp`, `the-original-cork/1.webp`, ...)
- URL built by `productImageUrl(path)` in `lib/images.ts` — never stored

---

## Auth

- Email/password via Supabase Auth
- Users created manually in Supabase dashboard (no signup UI)
- `proxy.ts` gates `/admin/*`: allowlist by `ADMIN_EMAILS` (comma-separated, no spaces)
- `/admin/login` is always accessible (early-return in `proxy.ts` — otherwise redirect loop)
- One email per line in env = one works, others overwritten. Must be comma-separated.
- Sign-out: `<form action="/admin/logout" method="POST">` in admin layout (sidebar + mobile header)
- Password visibility toggle in login form (`PasswordField.tsx`)

---

## Conventions

### Naming

- Product slugs: lowercase, hyphens (`the-original-cork`, `noisewhacker-3000`)
- Category slugs: lowercase, hyphens (`home-kitchen`, `garden-outdoor`)
- Product file path: `lib/products/items/<year>/<slug>.ts`
- Year = year added, not a date field

### Voice

- **Deadpan always.** The store never winks. The joke lives in the gap between format and content.
- **No "X happened. X did not happen."** Banned. Replaced by the forwarding loop or a specific useless detail.
- **No "very tired."** Retired. Teams are in huddles, watching PowerPoints, or updating.
- **Specific useless details beat cancellations.** "The huddle is not about the queue" > "nothing to review, reviewing anyway."
- **USPS is the one team outside the loop.** Unresponsive, notified twice, remains unresponsive.
- **The forwarding loop is the rhythm.** Every character forwards to another team; the teams form a loop; nothing resolves.

### The forwarding loop

- Customer Success Specialist ↔ Content Review Team
- Content Review Team ↔ AGWIC Corporate Headquarters
- Customer Success Specialist ↔ AGWIC Corporate Headquarters
- USPS: does not forward. Remains unresponsive.

### Catchphrases

Rotate. A catchphrase can appear **once per page**. Never twice.

- Content Review Team: "in a huddle", "watching a PowerPoint", "updating. Please do not turn off the Content Review Team", "has forwarded your request to..."
- Customer Success Specialist: "on a call", "with another customer", "updating", "has forwarded your request to..."
- USPS: "notified twice", "remains unresponsive", "will decide", "4–6 weeks"
- Corporate HQ: "in a meeting. The meeting has been forwarded."

### File naming

- Route files: `page.tsx`, `layout.tsx`, `actions.ts`, `route.ts`
- Components: PascalCase (`ProductDetail.tsx`, `SupportChat.tsx`)
- Actions: `actions.ts` in the route folder (server actions) or `lib/<feature>/actions.ts`
- Shared logic: `lib/`
- Scripts: `scripts/`

---

## Products & Content

### Product file format

Each product is one file in `lib/products/items/<year>/<slug>.ts`, exporting `product` that `satisfies Product`. The template is `lib/products/_template.ts`. See `docs/adding-content.md` for the full workflow.

### Products are code

- Benefits: git-tracked, reviewable in PRs, versioned, no admin UI, no DB roundtrip for rendering
- Trade-off: adding a product is a code change + deploy, not a form
- Mitigation: a `scripts/new-product.ts` generator (planned) prompts for fields and writes the file

### Counter-products

For many grievance products, there's a **counter-product** that enables the grievance, equally deadpan. Both are on the same side of the joke. The store sells the cure and the disease.

- The Original Cork™ ↔ The Whistler Enhancer™
- Humane Squirrel Eliminator™ ↔ Squirrel Feast™
- Slow Driver Deterrent ↔ Slow Lane Accessory Kit
- Cross-linked via `relatedSlugs` and `compareWith`

### Character sketches via "Customers also viewed"

`relatedSlugs` is curated to sketch a character, not just cross-sell. Two products in the same category tell opposite stories through their `alsoViewed` list:

- Cork customer also viewed: Emotional Support Brick, a book about patience (tired, overwhelmed)
- Whistler Enhancer customer also viewed: The Art of Not Reading the Room, A Megaphone But Bigger (oblivious, self-important)

When writing a product, ask: "Who buys this, and what else would that person click on?" The answer is the joke.

---

## Reviews & Moderation

### Submission

- Frictionless: no name, no email, no account
- Form: optional rating (1-5), optional title, required body (2-2000 chars)
- On submit: insert with `status = 'PENDING_REVIEW'`, `author_name = 'Anonymous'`
- Confirmation message uses the forwarding loop and Content Review Team jargon

### Moderation (`/admin/reviews`)

- **Content Review Queue** in the admin sidebar
- Tabs: Pending, Returned, Escalated (no Approved tab — approved reviews are done)
- **Seeds are filtered out** — they're approved by definition, don't need moderation
- **Product filter** — `?product=<slug>` shows all reviews (including approved + seeds) for that product, useful for adding admin comments
- Actions per review: Approve, Return for Revision, Escalate, Respond, Delete (delete only on pending)
- Approve/delete call `recompute_review_stats` to update the product's average

### Public display

- `ReviewsSection.tsx` reads from `getApprovedReviews(slug)` — the `reviews` table, `status = 'APPROVED'` only
- Histogram and average computed from approved reviews, no manual numbers
- Admin comments render indented with left border, labeled "Response from the Content Review Team"
- Review form is above the reviews list (invite first, then read)

### The rules

- No review is ever deleted except pending spam/offensive ones
- Returned and Escalated are soft-hidden, not removed
- Seeds skip moderation (`is_seed = true` → `status = 'APPROVED'` via seed script)

---

## Support Chat

### Architecture

SupportButton (floating, bottom-right) → SupportChat (modal)
→ POST /api/support → DeepSeek with system prompt from lib/support-prompt.ts

text

### The persona

- **Customer Success Specialist** (not the Content Review Team — that's a separate team)
- Helpful in tone, unhelpful in substance
- Confident, corporate, slightly rude when pressed
- Never admits the store is a parody
- Forwards everything to another team in the loop

### The prompt

`lib/support-prompt.ts` exports `SUPPORT_SYSTEM_PROMPT`. Edit that file to change the personality. The route (`app/api/support/route.ts`) handles the API call, model name, temperature, tokens.

**Rule of thumb:** if it's a sentence the AI might say, it goes in the prompt. If it's a parameter of the API call, it goes in the route.

### Model

- `deepseek-flash` (current model)
- Temperature 0.85
- `max_tokens: 200` (short replies)
- Last 10 messages sent (bounds cost)

### DeepSeek notes

- The key must have no trailing whitespace, no quotes in `.env.local`
- If auth fails locally but works on another site, check for a system-level env var override (`echo $env:DEEPSEEK_API_KEY` should be blank)
- `deepseek-flash` returns a `reasoning_content` field — ignore it, use `content` only
- On Windows PowerShell, use `Invoke-RestMethod` instead of `curl` for JSON payloads (quoting is more reliable)

---

## Tracking & Analytics

### Event flow

RouteTracker (every route change, /admin excluded) → trackClick
→ buffered → flush to /api/track (batch, sendBeacon on unload)
→ events table (service role, IP hashed)

text

### Event taxonomy

- `page-view` — fired by `RouteTracker`
- `product-view`, `add-to-cart-click`, `buy-click`, `share-click`, `review-submit` — fired by components
- Everything else goes in `metadata jsonb`

### Admin analytics (`/admin/analytics`)

- Day filter: 1 / 7 / 30 / 90 days via `?days=` URL param
- Stat cards: page views, unique sessions, top page, top product
- Tables: Top Pages, Top Products (views/adds/buys)
- Recent Events: last 30, all time (debugging view, not range-filtered)
- Uses `await connection()` + `<Suspense>` to avoid prerender errors from `Date.now()`

---

## SEO

### Files

- `app/sitemap.ts` — dynamic, reads `products` + `categories`, auto-updates on deploy
- `app/robots.ts` — disallows `/admin/`, `/api/`, `/cart`, `/bought`, `/purchase`, `/confirmation`
- `app/manifest.ts` — PWA manifest, theme color `#b3261e`
- `metadata.verification.google` in `layout.tsx` — Search Console verification

### Domain

- Canonical: `https://www.shopagwic.com`
- Apex redirects to `www` (Vercel default)
- All sitemap URLs use `www`
- `NEXT_PUBLIC_SITE_URL` env var must be `https://www.shopagwic.com`

### Search Console

- Verified via HTML tag
- Sitemap submitted
- Expect branded queries ("AGWIC", product names) in 1-4 weeks. Won't rank for generic queries ("how to stop squirrels").

---

## Configuration Choices Worth Keeping

### Image upload

- Client-side resize: long edge 1200px, WebP 0.85
- Fallback to JPEG if the browser returns PNG (iOS Safari) or file > 500KB
- Upload to Supabase Storage, then insert `product_images` row
- `next.config.ts`: `serverActions.bodySizeLimit: '4mb'` (default 1 MB too small for photos)
- For files larger than 4 MB, upload from the browser directly to Supabase

### Cart

- Cookie `agwic_cart` — `[{slug, qty}]`, httpOnly, sameSite lax, 30-day maxAge
- `addToCartAction` writes cookie + bumps `add_to_cart_count` + revalidates
- Header badge reads cookie server-side (`CartBadge.tsx`)
- `/cart` shows real line items, real subtotal (fake prices)
- "Buy All" loops cart items, records each purchase, clears cart, redirects to `/bought?from=cart&seed=...`

### Buy flow

- **Buy Now** — single item, immediate, redirects to `/bought?item=<slug>` with per-product joke
- **Buy All** — cart items, redirects to `/bought?from=cart&seed=<hash>` with per-cart joke (joke selected by hashing the seed, deterministic)
- **Phase 2** — will redirect to `/purchase` with email form instead (behind `PURCHASE_MODE` flag, not yet built)

### Fonts

- Inter (body/UI) + Fraunces (display) via `next/font/google`
- Variables exposed as `--font-inter` and `--font-fraunces`
- `@theme inline` in `global.css` maps them to `--font-sans` and `--font-display`
- No `font-family` on `body` (would override the `next/font` class)

### Styling

- Neutral palette: cream page, white cards, ink text, deep red accent
- `bg-stripe` for alternating rows
- Icon links in the header are text on desktop, icon on mobile
- Avoid arbitrary widths on mobile (`min-w-0 max-w-full block w-full` on inputs)

---

## Debugging Lessons

### Next.js 16 / Cache Components

- **`new Date()` / `Date.now()` in a prerendered route** → "unstable value" error. Fix: wrap the dynamic part in `<Suspense>` and `await connection()` before the timestamp read. Or `'use cache'` + `cacheLife('max')` for stable values (copyright year). Applies to admin analytics, footer, legal page.
- **`params` or `searchParams` read at the top of a page** → "instant navigation" warning. Fix: page shell is synchronous, pass the promise to a child inside `<Suspense>`.
- **`'use client'` on a file with an `async` component** → "Only Server Components can be async." Fix: split — the async part stays in a Server Component (separate file), the `useState` part goes in a `'use client'` child.
- **Function props in Client Components** → "must be serializable" warning. Fix: name the prop `<name>Action` (e.g., `onCloseAction`).
- **`window` / `navigator` in render** → hydration mismatch. Fix: read after mount with `useEffect` + `useState`.

### Supabase

- **`NEXT_PUBLIC_SUPABASE_ANON_KEY` is the publishable key** (`sb_publishable_...`) on new projects. Old `eyJ...` anon keys are legacy.
- **`SUPABASE_SERVICE_ROLE_KEY` is the secret key** (`sb_secret_...`). Never exposed to the browser.
- **Explicit GRANTs required** for projects created after May 30, 2026. `GRANT SELECT ON public.<table> TO anon, authenticated;` for each table. See `0004_explicit_grants.sql`.
- **`published` vs `status`** — pick one. We use `status` (`PENDING_REVIEW`, `APPROVED`, `RETURNED`, `ESCALATED`). Dropping `published` requires dropping the policy that references it first.
- **Seed scripts need `dotenv`** — `import './env'` at the top of the script, where `scripts/env.ts` loads `.env.local`.

### Auth

- **`ADMIN_EMAILS` must be comma-separated on one line** — two separate lines means only the last one is used.
- **Redirect loop on `/admin/login`** — `proxy.ts` must early-return on `/admin/login` before the auth check.
- **"Access denied" with correct password** — the signed-in email doesn't match `ADMIN_EMAILS`. Check both are identical (case-insensitive comparison in code).
- **Creating the admin user** — Supabase → Authentication → Users → Add user. Check "Auto Confirm User" or you can't sign in.

### PowerShell / Windows

- **Square brackets in paths** — `New-Item "app\legal\[page]"` creates a folder named `page`, not `[page]`. Use `-LiteralPath` or VS Code's file explorer.
- **`curl` in PowerShell** — use `curl.exe` (with `.exe`) or `Invoke-RestMethod` for JSON payloads. Quoting is unreliable otherwise.
- **`.env.local` parsing** — no quotes around values, no trailing whitespace. A trailing space becomes part of the API key.

### Deployment

- **404 on Vercel after deploy** — check Framework Preset is "Next.js", Root Directory is empty. Redeploy.
- **Domain not loading with `https://`** — DNS cache on local machine or router. `ipconfig /flushdns` (as admin), restart router, try Incognito.
- **SSL "not secure" on a new domain** — Vercel is still issuing the certificate. Wait 15-30 min.
- **`npm warn Unknown env config "cache-dir"`** — Vercel injects this. Harmless. Cannot be fixed locally.

### Hydration

- **Share button URLs** — `window.location.href` in render causes mismatch (server renders empty, client renders real URL). Fix: `useState('')` + `useEffect(() => setUrl(window.location.href), [])`.
- **`Math.random()` for order numbers** — deterministic hash of the product slug instead. Same order number on reload, varies per product.

---

## What's Not in the Stack

- No CSS-in-JS — Tailwind only
- No state management library — React state + server data
- No ORM — Supabase client queries directly
- No form library — plain `FormData` + server actions + `zod`
- No icon library — inline SVGs
- No component library — Tailwind + custom components
- No test framework — not set up
- No CMS — products are code
- No Stripe — checkout is simulated
- No order table — purchase events go to `product_stats` + `events`

---

## Quick Start for a New Project

1. `npx create-next-app@latest my-project --typescript --tailwind --app --import-alias "@/*"`
2. `npm install @supabase/supabase-js @supabase/ssr zod`
3. Create Supabase project, get publishable + secret keys
4. `.env.local`:
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   SUPABASE_SERVICE_ROLE_KEY=
   NEXT_PUBLIC_SITE_URL=https://www.yourdomain.com
   ADMIN_EMAILS=you@example.com
   TRACK_IP_SALT=
   DEEPSEEK_API_KEY=

text 5. `styles/global.css` — `@import "tailwindcss"` + `@theme inline` + `:root` theme 6. `app/layout.tsx` — fonts, Header, Footer, RouteTracker, metadata 7. `lib/categories.ts` — departments as `as const` array 8. `lib/products/types.ts` — the `Product` type 9. Run migrations: `0001_init.sql`, `0002_events.sql`, `0003_email.sql`, `0004_explicit_grants.sql` 10. `lib/products/items/2026/index.ts` + `_template.ts` — start adding products 11. `scripts/seed-reviews.ts` — run after products are written 12. Push to GitHub, connect Vercel, set env vars, deploy 13. Google Search Console — verify with HTML tag, submit sitemap

---

## Appendix: The Original Reference Doc Mapping

This project reuses the patterns from Mike + Elayne's reference:

- `gallery-data.ts` + `gallery_images` → `lib/products/` + `product_images`
- `gallery_images.storage_path` → `product_images.storage_path`
- `imageUrl(storage_path)` → `productImageUrl(path)`
- `proxy.ts` auth middleware → same pattern, extended with `ADMIN_EMAILS` allowlist
- One CSS file → same
- `next/font` → same
- RLS on every table → same
- Server actions + `revalidatePath` → same
- `serverActions.bodySizeLimit: '4mb'` → same
- Client-side resize before upload → not yet built (planned)

New patterns introduced for this project:

- Products as code, split by year, barrel files
- Review moderation with `status` column (not `published`)
- The forwarding loop as a copy convention
- Event tracking with batched client-side buffer
- DeepSeek support chat with a system prompt file
- Dynamic sitemap reading the product registry
