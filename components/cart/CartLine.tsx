'use client'

import Link from 'next/link'
import { useTransition } from 'react'
import { productImageUrl, formatPrice } from '@/lib/images'
import type { Product } from '@/lib/products/types'
import { removeFromCartAction, updateQtyAction } from '@/lib/purchase/actions'

export function CartLine({ product, qty }: { product: Product; qty: number }) {
    const [pending, startTransition] = useTransition()

    function onChangeQty(next: number) {
        startTransition(async () => {
            await updateQtyAction(product.slug, next)
        })
    }

    function onRemove() {
        startTransition(async () => {
            await removeFromCartAction(product.slug)
        })
    }

    return (
        <div className={`flex gap-4 border border-border bg-surface rounded p-3 ${pending ? 'opacity-60' : ''}`}>
            <Link href={`/product/${product.slug}`} className="shrink-0">
                <div className="w-24 h-24 bg-stripe rounded overflow-hidden">
                    <img
                        src={productImageUrl(product.heroPath)}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                </div>
            </Link>

            <div className="flex-1 min-w-0">
                <Link
                    href={`/product/${product.slug}`}
                    className="font-display text-base text-ink leading-snug line-clamp-2 hover:text-primary transition-colors"
                >
                    {product.name}
                </Link>
                <p className="text-xs text-ink-muted mt-1">{product.brand}</p>
                {product.stockLabel && (
                    <p className="text-xs text-primary mt-1">{product.stockLabel}</p>
                )}

                <div className="flex items-center gap-3 mt-2">
                    <label className="text-xs text-ink-muted">Qty:</label>
                    <select
                        value={qty}
                        onChange={(e) => onChangeQty(Number(e.target.value))}
                        disabled={pending}
                        className="border border-border rounded px-2 h-7 text-sm bg-surface"
                    >
                        {[1, 2, 3, 4, 5].map((n) => (
                            <option key={n} value={n}>{n}</option>
                        ))}
                    </select>
                    <button
                        onClick={onRemove}
                        disabled={pending}
                        className="text-xs text-ink-muted underline underline-offset-2 hover:text-ink ml-auto"
                    >
                        Remove
                    </button>
                </div>
            </div>

            <div className="text-right shrink-0">
                <p className="font-semibold text-ink">{formatPrice(product.priceCents * qty)}</p>
                {product.compareAtCents && (
                    <p className="text-xs text-ink-muted line-through">
                        {formatPrice(product.compareAtCents * qty)}
                    </p>
                )}
            </div>
        </div>
    )
}