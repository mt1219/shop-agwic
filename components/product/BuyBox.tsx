'use client'

import { useState, useTransition } from 'react'
import { formatPrice } from '@/lib/images'
import { trackClick } from '@/lib/track-click'
import { addToCartAction, buyNowAction } from '@/lib/purchase/actions'
import type { Product } from '@/lib/products/types'

export function BuyBox({ product }: { product: Product }) {
    const [qty, setQty] = useState(1)
    const [pending, startTransition] = useTransition()
    const [toast, setToast] = useState<string | null>(null)

    function showToast(msg: string) {
        setToast(msg)
        setTimeout(() => setToast(null), 3000)
    }

    function onAddToCart() {
        trackClick('add-to-cart-click', { product_slug: product.slug })
        startTransition(async () => {
            await addToCartAction(product.slug)
            showToast('Added to cart. The cart is imaginary. So is the cork.')
        })
    }

    function onBuy() {
        trackClick('buy-click', { product_slug: product.slug })
        startTransition(async () => {
            await buyNowAction(product.slug)
        })
    }

    return (
        <div className="border border-border rounded p-4 bg-surface">
            <div className="flex items-baseline gap-2 mb-1">
                <span className="font-display text-2xl text-ink">
                    {formatPrice(product.priceCents)}
                </span>
                {product.compareAtCents && (
                    <>
                        <span className="text-sm text-ink-muted line-through">
                            {formatPrice(product.compareAtCents)}
                        </span>
                        <span className="text-xs text-primary font-semibold">
                            Save {Math.round((1 - product.priceCents / product.compareAtCents) * 100)}%
                        </span>
                    </>
                )}
            </div>

            {product.stockLabel && (
                <p className="text-sm text-primary font-semibold mb-1">
                    {product.stockLabel}
                </p>
            )}
            {product.shipsIn && (
                <p className="text-xs text-ink-muted mb-4">{product.shipsIn}</p>
            )}

            <div className="flex items-center gap-2 mb-4">
                <label htmlFor="qty" className="text-sm text-ink">Qty:</label>
                <select
                    id="qty"
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                    className="border border-border rounded px-2 h-8 text-sm bg-surface"
                >
                    {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>{n}</option>
                    ))}
                </select>
            </div>

            <button
                onClick={onAddToCart}
                disabled={pending}
                className="w-full h-10 mb-2 bg-accent text-ink rounded text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
                style={{ backgroundColor: '#ffd166' }}
            >
                Add to Cart
            </button>
            <button
                onClick={onBuy}
                disabled={pending}
                className="w-full h-10 bg-primary text-primary-ink rounded text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
            >
                {pending ? 'Processing…' : 'Buy Now'}
            </button>

            <p className="fine-print mt-3">
                Free shipping on orders over $0. Every order qualifies.
            </p>

            {toast && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-ink text-white px-4 py-2 rounded shadow-lg text-sm">
                    {toast}
                </div>
            )}
        </div>
    )
}