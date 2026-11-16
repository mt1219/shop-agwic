import Link from 'next/link'
import { readCart, cartTotalItems } from '@/lib/cart'

export async function CartBadge() {
    const cart = await readCart()
    const count = cartTotalItems(cart)

    return (
        <Link
            href="/cart"
            className="hover:text-ink transition-colors relative inline-flex items-center"
            aria-label={`Cart (${count} items)`}
        >
            <span className="hidden md:inline">Cart</span>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="md:hidden"
                aria-hidden="true"
            >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span className="absolute -top-2 -right-3 text-[10px] bg-primary text-primary-ink rounded-full w-4 h-4 flex items-center justify-center">
                {count}
            </span>
        </Link>
    )
}