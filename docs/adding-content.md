# Adding Content — AGWIC

Step-by-step for adding products, images, reviews, and categories.

**Every section tells you the file and the command.** If a step doesn't have a file path, it's not a step.

---

## Adding a product

### Step 1: Create the product file

**File to copy:** `lib/products/_template.ts`
**File to create:** `lib/products/items/2026/<slug>.ts`

`<slug>` is lowercase, hyphenated: `the-whistler-enhancer`. The slug becomes the URL: `/product/the-whistler-enhancer`.

**How:** In VS Code, right-click `lib/products/_template.ts` → Copy → right-click `lib/products/items/2026/` → Paste → rename to `<slug>.ts`.

**If the year is not 2026:** see "Adding a year" at the bottom of this doc first. Then come back here.

### Step 2: Fill in the fields

**File:** `lib/products/items/2026/<slug>.ts`

Open the file you just created. Fill in these required fields:

| Field          | What it is                | Example                                     |
| -------------- | ------------------------- | ------------------------------------------- |
| `slug`         | Must match filename       | `'the-whistler-enhancer'`                   |
| `name`         | What user sees            | `'The Whistler Enhancer™'`                  |
| `brand`        | Fake company              | `'WhistleWorks Inc.'`                       |
| `priceCents`   | Integer                   | `3999`                                      |
| `category`     | One of 8 department slugs | `'home-kitchen'`                            |
| `blurb`        | One line                  | `'Afraid everyone can\'t hear you?'`        |
| `bullets`      | 4–6 ALL CAPS leads        | `['AMPLIFIES WHISTLING BY 40 DECIBELS*']`   |
| `about`        | 2–3 paragraphs            | `'You whistle. You know you whistle.'`      |
| `specs`        | Key/value pairs           | `[{ label: 'Material', value: 'Plastic' }]` |
| `terms`        | At least 5 lines          | `['By purchasing...']`                      |
| `heroPath`     | Storage path              | `'the-whistler-enhancer/hero.webp'`         |
| `galleryPaths` | Additional images         | `['the-whistler-enhancer/1.webp']`          |
| `seedReviews`  | 4–6 reviews               | See Step 3                                  |

Optional fields (leave `undefined` or empty if not using): `compareAtCents`, `bulletsFootnotes`, `specsFootnotes`, `customersSay`, `qa`, `warnings`, `relatedSlugs`, `compareWith`, `badges`, `stockLabel`, `shipsIn`.

**TypeScript will error if a required field is missing** — that's the `satisfies Product` at the bottom of the template. Run `npx tsc --noEmit` to check.

### Step 3: Write the seed reviews

**File:** `lib/products/items/2026/<slug>.ts` (the `seedReviews` array at the bottom)

The seed reviews are the essay. Each one is a short paragraph of someone's real life with the grievance. Five slots, five angles:

1. **The person who bought it and has a story.** Specific, dramatized.
2. **A different narrator, escalating.** Workplace, family, public transit.
3. **A third angle.** Almost didn't buy it, or bought it for someone else.
4. **The dissenter.** The whistler, the person who thinks the product is stupid. 1–2 stars.
5. **The deadpan utilitarian.** "Worked. Five stars. No notes."

Each review object:

```ts
{
  authorName: 'Greg M.',
  rating: 5,
  title: 'I bought this for my coworker',
  body: 'Dave whistles. Not songs. Just... tones. I put the cork on his desk.',
  verifiedPurchase: true,
  helpfulCount: 214,
  createdAt: '2025-11-04',
}
```

Vary `createdAt` across months. `helpfulCount` highest on the funniest and on the dissenter.

### Step 4: Upload images

**Where:** Supabase dashboard → Storage → `product-images` bucket

1. Create a folder named exactly `<slug>` (e.g., `the-whistler-enhancer/`)
2. Upload `hero.webp` inside it
3. Optionally upload `1.webp`, `2.webp` for the gallery
4. Format: WebP, long edge ~1200px, under 500KB

**If you skip this:** the site shows a grey "NO IMAGE" placeholder with the path. Fine for testing, not for launch.

### Step 5: Add to the year barrel

**File:** `lib/products/items/2026/index.ts`

Open it. Add an import at the top:

```ts
import { product as theWhistlerEnhancer } from "./the-whistler-enhancer";
```

And add it to the `items` array:

```ts
export const items = [
  // ...existing products...
  theWhistlerEnhancer,
];
```

**Without this step, the product doesn't exist** as far as the app is concerned. It won't appear on `/shop`, the homepage, or anywhere.

### Step 6: Add a buy message (optional, recommended)

**File:** `lib/buy-messages/products/2026.ts`

Add one entry to the `buyMessages2026` object, add an entry. The top-level `lib/buy-messages/index.ts` merges all year files automatically. No changes to `index.ts` needed when adding a product.

```ts
  "the-whistler-enhancer": (name) =>
    `Your ${name} is on its way. Your neighbor can already hear it. Your neighbor has been notified.`,
```

If skipped, the fallback message is used ("Thank you for your purchase of..."). The per-product message is funnier.

### Step 7: Seed the reviews into the database

**Command:** `npm run seed:reviews`

Run this in the VS Code terminal, from the project root (`shop-agwic/`). Not from a subfolder.

**What it does:** reads every product in `lib/products/index.ts`, checks if seed reviews already exist in the `reviews` table for that slug, and inserts the missing ones with `status = 'APPROVED'`. Then calls `recompute_review_stats` for each.

**Idempotent:** running it twice doesn't duplicate. It skips products that already have seeds.

**Requires:** `.env.local` with `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`. The script uses the service role key to bypass RLS.

**If it errors with "Missing NEXT_PUBLIC_SUPABASE_URL":** the script isn't loading `.env.local`. Check that `scripts/env.ts` exists and `seed-reviews.ts` imports it as the first line: `import './env'`.

### Step 8: Verify and deploy

**Command:** `npx tsc --noEmit`

Run this first. If it errors, fix the product file before proceeding. Common errors:

- Missing required field
- Typo in `category` (not in the `CategorySlug` union)
- Missing import in the year barrel

**Command:** `npm run dev`

Visit `http://localhost:3000/product/<slug>`. Check:

- Product page renders
- Seed reviews show (5 reviews, histogram computed)
- Buy button works → redirects to `/bought?item=<slug>` with the product-specific joke

**Commands:**

```powershell
git add .
git commit -m "Add product: <name>"
git push
```

Vercel deploys in ~2 minutes. The sitemap auto-updates (it reads the product registry). The product page is now live at `https://www.shopagwic.com/product/<slug>`.

---

## Adding a category

### Step 1: Edit the categories file

**File:** `lib/categories.ts`

Add to the `categories` array:

```ts
{
  slug: 'pets',
  name: 'Pets',
  description: 'For the animals you chose. And the ones you did not.',
},
```

The `CategorySlug` union is derived automatically (thanks to `as const`). TypeScript will now accept `category: 'pets'` in product files.

### Step 2: That's it

**No other files change.** The header nav, homepage department grid, shop sidebar, and category filter all read from `lib/categories.ts`. The new department appears everywhere automatically.

### Step 3: When to add a category

Only when you have 3+ products that clearly don't fit any existing department. Don't add a category for a single product — put it in the closest existing department. The 8 departments are broad enough for most things.

---

## Adding a year

### Step 1: Create the year folder and barrel

**File to create:** `lib/products/items/2027/index.ts`

Contents:

```ts
export const items = [];
```

### Step 2: Add to the top-level registry

**File:** `lib/products/index.ts`

Add the import:

```ts
import { items as items2027 } from "./items/2027";
```

And add it to the `products` array:

```ts
export const products: Product[] = [...items2026, ...items2027];
```

### Step 3: Start adding products to `items/2027/`

Same workflow as above. The year is just the year you added the file, not a date field.

---

## Curating the character sketch

When you write a product, the `relatedSlugs` array should be curated to sketch a character, not just cross-sell.

### The question

"Who buys this product, and what else would that person click on?"

### The answer is the joke

Two products in the same category tell opposite stories through their `relatedSlugs`:

**The Original Cork™** — customers also viewed:

- The Whistler Enhancer™ (the thing they're trying to stop)
- Emotional Support Brick (what they need after dealing with whistlers)
- Permission to Leave the Party PDF (how they escape)
- **Character:** the tired, overwhelmed person who's tried everything.

**The Whistler Enhancer™** — customers also viewed:

- The Original Cork™ (the war they're in)
- _The Art of Not Reading the Room_ (a self-help book that doesn't exist)
- _A Megaphone, But Bigger_ (a joke product)
- **Character:** the oblivious, self-important person who thinks everyone wants to hear them.

Same category. Same joke. Two different humans. The "Customers also viewed" strip tells the story.

### The counter-product

For many grievance products, write the **counter-product** — the product that enables the grievance, equally deadpan. Cross-link them via `relatedSlugs` and add each other to `compareWith`.

| Grievance product           | Counter-product            |
| --------------------------- | -------------------------- |
| The Original Cork™          | The Whistler Enhancer™     |
| Humane Squirrel Eliminator™ | Squirrel Feast™            |
| NoiseWhacker™ 3000          | The Leaf Blower Megaphone™ |
| Slow Driver Deterrent       | Slow Lane Accessory Kit    |

The store sells the cure and the disease. Nobody wins.

---

## Adding a review (as a user)

**Where:** `/product/<slug>` on the live site (or localhost)

Scroll to "Customer reviews." The form is directly under the histogram. Fill in:

- Rating (optional, 1–5 stars)
- Title (optional)
- Review body (required, 2–2000 characters)

Click **Submit review**. The confirmation says "Your review has been received. It has been routed to the Content Review Team (CRT). Status: PENDING_REVIEW."

The review goes to the database with `status = 'PENDING_REVIEW'`. It does **not** appear on the product page yet.

---

## Approving a review (as admin)

### Step 1: Go to the queue

**URL:** `https://www.shopagwic.com/admin/reviews` (or `http://localhost:3000/admin/reviews`)

Sign in with your admin email first if you're not already signed in.

### Step 2: Find the review

The queue shows three tabs: Pending, Returned, Escalated. New reviews are in **Pending**.

Seed reviews are filtered out — the queue only shows user-submitted reviews.

### Step 3: Take action

Per review, the buttons are:

| Button                  | What it does                                                                                                                                                |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Approve**             | Sets `status = 'APPROVED'`. Review appears on the product page. `recompute_review_stats` runs, average updates.                                             |
| **Return for Revision** | Sets `status = 'RETURNED'`. Review moves to Returned tab, stays hidden.                                                                                     |
| **Escalate**            | Sets `status = 'ESCALATED'`. Review moves to Escalated tab, stays hidden.                                                                                   |
| **Respond**             | Opens a textarea. Write a response, click Save. The response appears on the product page under the review, labeled "Response from the Content Review Team." |
| **Delete**              | Only shows on Pending reviews. Permanently removes the review. Confirm dialog first.                                                                        |

### Step 4: Find approved reviews (to add comments later)

**URL:** `/admin/reviews?product=<slug>`

This shows **all** reviews for that product — including approved and seed reviews. Use this when you want to add a "Response from the Content Review Team" to a review that's already public.

---

## Adding a FAQ entry

**File:** `app/faq/page.tsx`

Find the `faqs` array. Add:

```ts
{
  q: 'Your question here?',
  a: 'Your answer here.',
},
```

Keep it in the voice: deadpan, corporate, no parody admission. If the answer would use "very tired" or "X happened / X didn't happen," rewrite it. Use the forwarding loop or a specific useless detail.

---

## Adding a legal page

### Step 1: Create the data file

**File to create:** `lib/legal/<slug>.ts` (e.g., `lib/legal/shipping.ts`)

Export an object matching the `LegalPage` type (see `lib/legal/index.ts` for the shape).

### Step 2: Register it

**File:** `lib/legal/index.ts`

Add the import:

```ts
import { shipping } from "./shipping";
```

Add it to the `legalPages` object:

```ts
export const legalPages: Record<string, LegalPage> = {
  terms,
  privacy,
  cookies,
  accessibility,
  shipping,
};
```

### Step 3: Add a footer link

**File:** `components/layout/Footer.tsx`

Add to the Legal column:

```ts
{ label: 'Shipping', href: '/legal/shipping' },
```

The route `app/legal/[page]/page.tsx` already handles all legal pages. No route changes needed.

---

## Changing the support prompt

**File:** `lib/support-prompt.ts`

Edit the `SUPPORT_SYSTEM_PROMPT` string. Save. Commit. Push.

**Rule of thumb:** if it's a sentence the AI might say, it goes in the prompt. If it's a parameter of the API call (model name, temperature, max tokens), it goes in `app/api/support/route.ts`.

### Adding a new catchphrase

If you want to retire a catchphrase (e.g., "on a call" is getting old), add a new one to the list and update the prompt examples. Never remove a catchphrase without adding a replacement.

### Adding a forwarding rule

If a new category of question should forward to a specific team, add a line to the "THE FORWARDING LOOP" section of the prompt:

```
- If the user asks about <topic>, forward them to <team>.
```

---

## Common mistakes

### Product doesn't appear

1. **Is it imported in the year barrel?** Open `lib/products/items/<year>/index.ts`. Is the product imported and added to the `items` array? If not, it doesn't exist as far as the app is concerned.
2. **Is the slug typed correctly?** The slug in the file must match the filename. `the-original-cork.ts` must export `slug: 'the-original-cork'`.
3. **Is the category valid?** TypeScript should catch this. If you see a type error, the category slug isn't in `lib/categories.ts`.
4. **Did the deploy succeed?** Check Vercel — if the build failed, the old version is still live.

### Images don't load

1. **Is the bucket public?** Supabase → Storage → `product-images` → Settings → "Public bucket" should be on.
2. **Is the path correct?** `heroPath` should be `<slug>/hero.webp`, not the full URL.
3. **Is the file uploaded?** Supabase → Storage → `product-images` → `<slug>/` → should see the file.

### Reviews don't appear on the product page

1. **Is the review approved?** `status = 'APPROVED'` in the `reviews` table.
2. **Did the seed script run?** `npm run seed:reviews`.
3. **Is the product slug correct in the review row?** It must match the product's slug.

### TypeScript errors

Almost always one of:

- Missing field in the product file (the `satisfies Product` at the bottom catches this)
- Typo in `category` (not in the `CategorySlug` union)
- Missing import in the year barrel
- Using `onClose` instead of `onCloseAction` (the Next.js 16 Client Component prop rule)

Run `npx tsc --noEmit` to see exactly what's wrong.

---

## What not to do

- **Don't say "very tired"** — retired. Use a forwarding line or a huddle/PowerPoint/updating catchphrase.
- **Don't use "X happened. X did not happen."** — banned. Use the forwarding loop or a specific useless detail.
- **Don't admit the store is a parody** in user-facing copy. The deadpan is the joke. The footer disclaimer is the only exception.
- **Don't add a product without seed reviews.** The reviews are the writing. A product with no reviews is a product with no essay.
- **Don't manually set the review average.** It's computed from approved reviews. If the number looks wrong, check the reviews, not the `product_stats` row.
- **Don't put images in the repo.** They go in Supabase Storage. Only code and text in git.
