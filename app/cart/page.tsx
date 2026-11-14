import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Your Cart — AGWIC',
    robots: { index: false, follow: false },
}

export default function CartPage() {
    return (
        <div className="mx-auto max-w-3xl px-4 py-12">
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

            <div className="mt-8 border-t border-border pt-6">
                <p className="text-xs uppercase tracking-wide text-ink-muted mb-3">
                    What happens if I click Add to Cart?
                </p>
                <div className="space-y-2 text-sm text-ink leading-relaxed">
                    <p>
                        A counter increments on our server. The counter is not visible to
                        you. The counter is visible to us. The counter is the only real
                        thing about this cart.
                    </p>
                    <p className="fine-print">
                        Counters are not refundable. Counters are not transferable. Counters
                        are not yours.
                    </p>
                </div>
            </div>
        </div>
    )
}