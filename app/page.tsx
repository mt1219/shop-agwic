import Link from 'next/link'
import { products } from '@/lib/products'
import { categories } from '@/lib/categories'
import { productImageUrl, formatPrice } from '@/lib/images'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AGWIC — Everything. Everywhere. Eventually.',
  description:
    'American Global Worldwide International Commerce. A global conglomerate selling things that should not be sold.',
}

export default function HomePage() {
  // Featured: first 4 products (stable order, no date/random)
  const featured = products.slice(0, 4)

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-widest text-ink-muted mb-4">
              American Global Worldwide International Commerce
            </p>
            <h1 className="font-display text-4xl md:text-6xl text-ink leading-tight mb-4">
              Everything. Everywhere. Eventually.
            </h1>
            <p className="text-base md:text-lg text-ink-muted mb-8 max-w-lg">
              A global conglomerate selling things that should not be sold, to
              people who should not be buying them.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link
                href="/shop"
                className="inline-flex items-center h-10 px-5 bg-primary text-primary-ink rounded text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Shop All Products
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center h-10 px-5 border border-border rounded text-sm text-ink hover:border-ink transition-colors"
              >
                About AGWIC
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <h2 className="font-display text-2xl text-ink mb-6">
            Shop by Department
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/shop?category=${c.slug}`}
                className="p-4 border border-border bg-surface rounded hover:border-ink transition-colors"
              >
                <p className="text-sm font-semibold text-ink mb-1">{c.name}</p>
                <p className="text-xs text-ink-muted leading-snug">
                  {c.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="font-display text-2xl text-ink">Featured</h2>
              <p className="text-sm text-ink-muted mt-1">
                Selected by the Content Review Team. The Content Review Team
                has not reviewed these.
              </p>
            </div>
            <Link
              href="/shop"
              className="text-sm text-primary underline underline-offset-2"
            >
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featured.map((p) => (
              <Link
                key={p.slug}
                href={`/product/${p.slug}`}
                className="group block border border-border bg-surface rounded overflow-hidden hover:border-ink transition-colors"
              >
                <div className="aspect-square bg-stripe overflow-hidden">
                  <img
                    src={productImageUrl(p.heroPath)}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs text-ink-muted mb-1">{p.brand}</p>
                  <h3 className="font-display text-base text-ink mb-1 leading-snug line-clamp-2">
                    {p.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="font-semibold text-ink">
                      {formatPrice(p.priceCents)}
                    </span>
                    {p.compareAtCents && (
                      <span className="text-xs text-ink-muted line-through">
                        {formatPrice(p.compareAtCents)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-t border-border bg-stripe">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { title: 'Free Shipping', subtitle: 'On orders over $0' },
              { title: '30-Day Returns', subtitle: 'No returns accepted' },
              { title: 'Secure Checkout', subtitle: 'No payment collected' },
              { title: 'Parody Store', subtitle: 'Nothing is for sale' },
            ].map((item) => (
              <div key={item.title}>
                <p className="text-sm font-semibold text-ink">{item.title}</p>
                <p className="text-xs text-ink-muted mt-1">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}