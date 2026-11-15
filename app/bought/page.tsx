import Link from 'next/link'
import { Suspense } from 'react'
import { getProduct } from '@/lib/products'
import { getBuyMessage } from '@/lib/buy-messages'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Purchase Complete — AGWIC',
    robots: { index: false, follow: false },
}

export default function BoughtPage({
    searchParams,
}: {
    searchParams: Promise<{ item?: string }>
}) {
    return (
        <div className="mx-auto max-w-2xl px-4 py-16">
            <Suspense fallback={<BoughtSkeleton />}>
                <BoughtContent searchParams={searchParams} />
            </Suspense>
        </div>
    )
}

async function BoughtContent({
    searchParams,
}: {
    searchParams: Promise<{ item?: string; from?: string }>
}) {
    const { item, from } = await searchParams

    // Cart purchase path — ?from=cart
    if (from === 'cart' || !item) {
        return (
            <div className="border border-border bg-surface rounded p-8 md:p-12 text-center">
                <p className="text-xs uppercase tracking-widest text-primary mb-4">
                    Purchase Complete
                </p>

                <h1 className="font-display text-2xl md:text-3xl text-ink mb-4">
                    Your items are imaginary. Your cart has been cleared. Your
                    satisfaction is imaginary.
                </h1>

                <p className="text-sm text-ink-muted mb-8 max-w-md mx-auto">
                    Nothing has been shipped. Nothing will be
                    shipped. Your cart has been cleared anyway.
                </p>

                <div className="flex gap-3 justify-center flex-wrap">
                    <Link
                        href="/shop"
                        className="inline-flex items-center h-10 px-5 bg-primary text-primary-ink rounded text-sm font-semibold hover:opacity-90 transition-opacity"
                    >
                        Continue Shopping
                    </Link>
                    <Link
                        href="/"
                        className="inline-flex items-center h-10 px-5 border border-border rounded text-sm text-ink hover:border-ink transition-colors"
                    >
                        Home
                    </Link>
                </div>

                <p className="fine-print mt-10 pt-6 border-t border-border">
                    Order #<span className="font-mono">AGWIC-CART</span>
                    {' · '}Estimated delivery: Eventually. See §7.
                </p>
            </div>
        )
    }

    // Single-item purchase path — ?item=slug
    const product = getProduct(item)
    const productName = product?.name ?? 'your item'
    const message = getBuyMessage(item, productName)

    return (
        <div className="border border-border bg-surface rounded p-8 md:p-12 text-center">
            <p className="text-xs uppercase tracking-widest text-primary mb-4">
                Purchase Complete
            </p>

            <h1 className="font-display text-2xl md:text-3xl text-ink mb-4">
                {message}
            </h1>

            <p className="text-sm text-ink-muted mb-8 max-w-md mx-auto">
                Nothing has been shipped. Nothing will be
                shipped. Nothing was ever going to be shipped.
            </p>

            <div className="flex gap-3 justify-center flex-wrap">
                {product ? (
                    <Link
                        href={`/product/${product.slug}`}
                        className="inline-flex items-center h-10 px-5 bg-primary text-primary-ink rounded text-sm font-semibold hover:opacity-90 transition-opacity"
                    >
                        Back to {product.name.length > 30 ? 'Product' : product.name}
                    </Link>
                ) : (
                    <Link
                        href="/shop"
                        className="inline-flex items-center h-10 px-5 bg-primary text-primary-ink rounded text-sm font-semibold hover:opacity-90 transition-opacity"
                    >
                        Keep Shopping
                    </Link>
                )}
                <Link
                    href="/shop"
                    className="inline-flex items-center h-10 px-5 border border-border rounded text-sm text-ink hover:border-ink transition-colors"
                >
                    Shop More
                </Link>
            </div>

            <p className="fine-print mt-10 pt-6 border-t border-border">
                Order #<span className="font-mono">{generateOrderNumber(item)}</span>
                {' · '}Estimated delivery: Eventually. See §7.
            </p>
        </div>
    )
}

// Deterministic order number from item slug — no random, no date
function generateOrderNumber(item: string): string {
    let hash = 0
    for (let i = 0; i < item.length; i++) {
        hash = (hash << 5) - hash + item.charCodeAt(i)
        hash = hash & hash
    }
    const base = Math.abs(hash).toString(36).toUpperCase().padStart(6, '0').slice(0, 6)
    return `AGWIC-${base}`
}

function BoughtSkeleton() {
    return (
        <div className="border border-border bg-surface rounded p-8 md:p-12">
            <div className="h-3 bg-stripe rounded w-32 mx-auto mb-4" />
            <div className="h-8 bg-stripe rounded w-3/4 mx-auto mb-4" />
            <div className="h-4 bg-stripe rounded w-1/2 mx-auto mb-8" />
            <div className="h-10 bg-stripe rounded w-40 mx-auto" />
        </div>
    )
}