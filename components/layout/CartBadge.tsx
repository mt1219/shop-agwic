import Link from 'next/link'
import { readCart, cartTotalItems } from '@/lib/cart'

export async function CartBadge() {
    const cart = await readCart()
    const count = cartTotalItems(cart)

    return (
        <Link
            href="/cart"
            className="hover:text-ink transition-colors relative"
            aria-label={`Cart (${count} items)`}
        >
            Cart
            <span className="absolute -top-2 -right-3 text-[10px] bg-primary text-primary-ink rounded-full w-4 h-4 flex items-center justify-center">
                {count}
            </span>
        </Link>
    )
}