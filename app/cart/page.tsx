import Link from 'next/link'
import { Suspense } from 'react'
import { readCart } from '@/lib/cart'
import { getProduct } from '@/lib/products'
import { productImageUrl, formatPrice } from '@/lib/images'
import { removeFromCartAction, updateQtyAction, clearCartAction, buyCartAction } from '@/lib/purchase/actions'
import { CartLine } from '@/components/cart/CartLine'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Your Cart — AGWIC',
    robots: { index: false, follow: false },
}

export default function CartPage() {
    return (
        <div className="mx-auto max-w-5xl px-4 py-8">
            <Suspense fallback={<CartSkeleton />}>
                <CartContent />
            </Suspense>
        </div>
    )
}

async function CartContent() {
    const cart = await readCart()
    const items = cart
        .map((line) => {
            const product = getProduct(line.slug)
            return product ? { product, qty: line.qty } : null
        })
        .filter((x): x is { product: NonNullable<ReturnType<typeof getProduct>>; qty: number } => x !== null)

    const subtotal = items.reduce((sum, item) => sum + item.product.priceCents * item.qty, 0)
    const totalItems = items.reduce((sum, item) => sum + item.qty, 0)

    if (items.length === 0) {
        return (
            <>
                <h1 className="font-display text-3xl text-ink mb-2">Your Cart</h1>
                <p className="text-sm text-ink-muted mb-8">
                    The cart is imaginary. The items in it are imaginary. The total is
                    imaginary. Please proceed.
                </p>
                <div className="border border-border bg-surface rounded p-10 text-center">
                    <p className="font-display text-xl text-ink mb-2">
                        Your cart is empty.
                    </p>
                    <p className="text-sm text-ink-muted mb-6 max-w-md mx-auto">
                        Your cart has always been empty. Your cart will always be empty. The
                        cart is a concept. The cart is not a place. The cart is not a thing.
                    </p>
                    <Link
                        href="/shop"
                        className="inline-flex items-center h-10 px-5 bg-primary text-primary-ink rounded text-sm font-semibold hover:opacity-90 transition-opacity"
                    >
                        Shop Products
                    </Link>
                </div>
            </>
        )
    }

    return (
        <>
            <h1 className="font-display text-3xl text-ink mb-2">Your Cart</h1>
            <p className="text-sm text-ink-muted mb-8">
                {totalItems} item{totalItems === 1 ? '' : 's'}. All imaginary.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
                <div className="space-y-3">
                    {items.map((item) => (
                        <CartLine
                            key={item.product.slug}
                            product={item.product}
                            qty={item.qty}
                        />
                    ))}

                    <form action={clearCartAction}>
                        <button
                            type="submit"
                            className="text-xs text-ink-muted underline underline-offset-2 hover:text-ink"
                        >
                            Empty cart
                        </button>
                    </form>
                </div>

                <aside>
                    <div className="border border-border bg-surface rounded p-4 sticky top-4">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-ink-muted">Subtotal ({totalItems} items)</span>
                            <span className="text-ink font-semibold">{formatPrice(subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-sm mb-4">
                            <span className="text-ink-muted">Shipping</span>
                            <span className="text-primary font-semibold">FREE</span>
                        </div>
                        <div className="flex justify-between text-base border-t border-border pt-3 mb-4">
                            <span className="text-ink font-semibold">Total</span>
                            <span className="text-ink font-semibold">{formatPrice(subtotal)}</span>
                        </div>

                        <form action={buyCartAction}>
                            <button
                                type="submit"
                                className="w-full h-10 bg-primary text-primary-ink rounded text-sm font-semibold hover:opacity-90 transition-opacity mb-2"
                            >
                                Buy All
                            </button>
                        </form>
                        <p className="fine-print text-center">
                            Payment not collected. Delivery not guaranteed. See §7.
                        </p>
                    </div>
                </aside>
            </div>
        </>
    )
}

function CartSkeleton() {
    return (
        <>
            <div className="h-10 bg-stripe rounded w-48 mb-2" />
            <div className="h-4 bg-stripe rounded w-64 mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
                <div className="space-y-3">
                    {[1, 2].map((i) => (
                        <div key={i} className="h-24 bg-stripe rounded" />
                    ))}
                </div>
                <div className="h-48 bg-stripe rounded" />
            </div>
        </>
    )
}