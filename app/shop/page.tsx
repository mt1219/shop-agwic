import Link from 'next/link'
import { Suspense } from 'react'
import { products } from '@/lib/products'
import { categories, getCategory } from '@/lib/categories'
import { productImageUrl, formatPrice } from '@/lib/images'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Shop All Products',
    description: 'Every product AGWIC makes, does not make, or has made up.',
}

type SearchParams = {
    category?: string
    q?: string
    sort?: string
}

export default function ShopPage({
    searchParams,
}: {
    searchParams: Promise<SearchParams>
}) {
    return (
        <div className="mx-auto max-w-7xl px-4 py-8">
            <Suspense fallback={<ShopSkeleton />}>
                <ShopContent searchParams={searchParams} />
            </Suspense>
        </div>
    )
}

async function ShopContent({
    searchParams,
}: {
    searchParams: Promise<SearchParams>
}) {
    const params = await searchParams
    const activeCategory = params.category ? getCategory(params.category) : undefined
    const query = params.q?.trim().toLowerCase() ?? ''
    const sort = params.sort ?? 'default'

    let filtered = products
    if (activeCategory) {
        filtered = filtered.filter((p) => p.category === activeCategory.slug)
    }
    if (query) {
        filtered = filtered.filter(
            (p) =>
                p.name.toLowerCase().includes(query) ||
                p.blurb.toLowerCase().includes(query) ||
                p.brand.toLowerCase().includes(query),
        )
    }

    // Sort
    const sorted = [...filtered]
    if (sort === 'price-asc') sorted.sort((a, b) => a.priceCents - b.priceCents)
    else if (sort === 'price-desc') sorted.sort((a, b) => b.priceCents - a.priceCents)
    else if (sort === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name))

    const heading = activeCategory ? activeCategory.name : 'All Products'
    const subheading = activeCategory
        ? activeCategory.description
        : 'Every product AGWIC makes, does not make, or has made up.'

    return (
        <>
            <header className="mb-8">
                <h1 className="font-display text-3xl md:text-4xl text-ink mb-1">
                    {heading}
                </h1>
                <p className="text-sm text-ink-muted">{subheading}</p>
                <p className="fine-print mt-2">
                    {sorted.length} product{sorted.length === 1 ? '' : 's'}
                    {query && ` matching "${params.q}"`}
                </p>
            </header>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar: categories + sort */}
                <aside className="lg:w-56 shrink-0 space-y-6">
                    <div>
                        <h2 className="text-xs uppercase tracking-wide text-ink-muted mb-2">
                            Departments
                        </h2>
                        <ul className="space-y-1">
                            <li>
                                <Link
                                    href="/shop"
                                    className={`block text-sm py-1 ${!activeCategory ? 'font-semibold text-ink' : 'text-ink-muted hover:text-ink'
                                        }`}
                                >
                                    All Products
                                </Link>
                            </li>
                            {categories.map((c) => (
                                <li key={c.slug}>
                                    <Link
                                        href={`/shop?category=${c.slug}`}
                                        className={`block text-sm py-1 ${activeCategory?.slug === c.slug
                                                ? 'font-semibold text-ink'
                                                : 'text-ink-muted hover:text-ink'
                                            }`}
                                    >
                                        {c.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-xs uppercase tracking-wide text-ink-muted mb-2">
                            Sort
                        </h2>
                        <ul className="space-y-1">
                            {[
                                { value: 'default', label: 'Default' },
                                { value: 'price-asc', label: 'Price: Low to High' },
                                { value: 'price-desc', label: 'Price: High to Low' },
                                { value: 'name', label: 'Name: A–Z' },
                            ].map((opt) => {
                                const qs = new URLSearchParams()
                                if (activeCategory) qs.set('category', activeCategory.slug)
                                if (params.q) qs.set('q', params.q)
                                if (opt.value !== 'default') qs.set('sort', opt.value)
                                const href = `/shop${qs.toString() ? `?${qs.toString()}` : ''}`
                                return (
                                    <li key={opt.value}>
                                        <Link
                                            href={href}
                                            className={`block text-sm py-1 ${sort === opt.value
                                                    ? 'font-semibold text-ink'
                                                    : 'text-ink-muted hover:text-ink'
                                                }`}
                                        >
                                            {opt.label}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </aside>

                {/* Grid */}
                <div className="flex-1">
                    {sorted.length === 0 ? (
                        <div className="border border-border bg-surface rounded p-10 text-center">
                            <p className="font-display text-xl text-ink mb-2">
                                No products found
                            </p>
                            <p className="text-sm text-ink-muted">
                                The Content Review Team has been notified. The Content Review
                                Team has not been notified.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {sorted.map((p) => (
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
                                        <p className="text-xs text-ink-muted line-clamp-2 mb-2">
                                            {p.blurb}
                                        </p>
                                        <div className="flex items-baseline gap-2">
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
                    )}
                </div>
            </div>
        </>
    )
}

function ShopSkeleton() {
    return (
        <div>
            <div className="h-10 w-64 bg-stripe rounded mb-2" />
            <div className="h-4 w-96 bg-stripe rounded mb-8" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="border border-border rounded overflow-hidden">
                        <div className="aspect-square bg-stripe" />
                        <div className="p-4 space-y-2">
                            <div className="h-3 bg-stripe rounded w-1/3" />
                            <div className="h-4 bg-stripe rounded w-2/3" />
                            <div className="h-3 bg-stripe rounded w-1/2" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}