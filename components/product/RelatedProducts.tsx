import Link from 'next/link'
import type { Product } from '@/lib/products/types'
import { productImageUrl, formatPrice } from '@/lib/images'

export function RelatedProducts({ products }: { products: Product[] }) {
    if (products.length === 0) return null
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {products.map((p) => (
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
                    <div className="p-3">
                        <h3 className="font-display text-sm text-ink leading-snug line-clamp-2 mb-1">
                            {p.name}
                        </h3>
                        <p className="text-xs text-ink-muted">{formatPrice(p.priceCents)}</p>
                    </div>
                </Link>
            ))}
        </div>
    )
}