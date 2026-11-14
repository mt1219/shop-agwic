import Link from 'next/link'
import type { Product } from '@/lib/products/types'
import { productImageUrl, formatPrice } from '@/lib/images'
import { ProductGallery } from './ProductGallery'
import { BuyBox } from './BuyBox'
import { BulletList } from './BulletList'
import { SpecsTable } from './SpecsTable'
import { QASection } from './QASection'
import { ReviewsSection } from './ReviewsSection'
import { RelatedProducts } from './RelatedProducts'
import { CompareTable } from './CompareTable'
import { ShareButtons } from './ShareButtons'

type Props = {
    product: Product
    categoryName?: string
    related: Product[]
    alsoViewed: Product[]
}

export function ProductDetail({ product, categoryName, related, alsoViewed }: Props) {
    return (
        <div className="mx-auto max-w-7xl px-4 py-6">
            {/* Breadcrumb */}
            <nav className="text-xs text-ink-muted mb-4 flex flex-wrap gap-1">
                <Link href="/" className="hover:text-ink">Home</Link>
                <span>/</span>
                <Link href="/shop" className="hover:text-ink">Shop</Link>
                {categoryName && (
                    <>
                        <span>/</span>
                        <Link href={`/shop?category=${product.category}`} className="hover:text-ink">
                            {categoryName}
                        </Link>
                    </>
                )}
                <span>/</span>
                <span className="text-ink">{product.name}</span>
            </nav>

            {/* Badges */}
            {product.badges && product.badges.length > 0 && (
                <div className="flex gap-2 mb-3">
                    {product.badges.map((b) => (
                        <span
                            key={b}
                            className="text-[10px] uppercase tracking-wide bg-primary text-primary-ink px-2 py-0.5 rounded"
                        >
                            {b}
                        </span>
                    ))}
                </div>
            )}

            {/* Top: gallery + buy box */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 mb-10">
                <div>
                    <ProductGallery
                        heroPath={product.heroPath}
                        galleryPaths={product.galleryPaths}
                        name={product.name}
                    />
                </div>
                <div>
                    <h1 className="font-display text-2xl md:text-3xl text-ink mb-1">
                        {product.name}
                    </h1>
                    <p className="text-sm text-ink-muted mb-2">
                        Brand: <span className="text-primary">{product.brand}</span>
                    </p>
                    {product.soldBy && (
                        <p className="fine-print mb-4">{product.soldBy}</p>
                    )}

                    <BuyBox product={product} />

                    {product.warnings && product.warnings.length > 0 && (
                        <div className="mt-4 p-3 border border-warning bg-warning-bg rounded">
                            {product.warnings.map((w, i) => (
                                <p key={i} className="text-[11px] uppercase tracking-wide text-warning font-semibold leading-snug">
                                    {w}
                                </p>
                            ))}
                        </div>
                    )}

                    <ShareButtons product={product} />
                </div>
            </div>

            {/* Middle: bullets + about + specs + Q&A */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 mb-10">
                <div className="space-y-8">
                    <BulletList bullets={product.bullets} footnotes={product.bulletsFootnotes} />

                    {product.customersSay && (
                        <section className="border border-border bg-stripe rounded p-4">
                            <h2 className="text-xs uppercase tracking-wide text-ink-muted mb-2">
                                Customers say
                            </h2>
                            <p className="text-sm text-ink leading-relaxed">
                                {product.customersSay}
                            </p>
                            <p className="fine-print mt-2">
                                AI-generated from the text of customer reviews. Not actually AI. Not actually generated.
                            </p>
                        </section>
                    )}

                    <section>
                        <h2 className="font-display text-xl text-ink mb-3">About this item</h2>
                        {product.about.split('\n\n').map((para, i) => (
                            <p key={i} className="text-sm leading-relaxed text-ink mb-3">
                                {para}
                            </p>
                        ))}
                    </section>

                    {product.qa && product.qa.length > 0 && (
                        <QASection qa={product.qa} />
                    )}
                </div>

                <div>
                    <SpecsTable specs={product.specs} footnotes={product.specsFootnotes} />

                    {product.terms && product.terms.length > 0 && (
                        <details className="mt-6 border border-border rounded">
                            <summary className="cursor-pointer p-3 text-sm font-semibold text-ink hover:bg-stripe transition-colors">
                                Terms &amp; Conditions
                            </summary>
                            <div className="p-3 border-t border-border text-xs text-ink-muted leading-relaxed space-y-1.5">
                                {product.terms.map((t, i) => (
                                    <p key={i}>{t}</p>
                                ))}
                                {product.termsRef && (
                                    <p className="pt-2">
                                        <Link
                                            href={`/legal/terms#${product.termsRef}`}
                                            className="text-primary underline underline-offset-2"
                                        >
                                            See full legal terms →
                                        </Link>
                                    </p>
                                )}
                            </div>
                        </details>
                    )}
                </div>
            </div>

            {/* Reviews */}
            <ReviewsSection product={product} />

            {/* Related products */}
            {related.length > 0 && (
                <section className="mb-10">
                    <h2 className="font-display text-xl text-ink mb-4">
                        Frequently bought together
                    </h2>
                    <RelatedProducts products={related} />
                </section>
            )}

            {/* Compare */}
            {product.compareWith && product.compareWith.length > 0 && (
                <CompareTable rows={product.compareWith} />
            )}

            {/* Also viewed */}
            {alsoViewed.length > 0 && (
                <section className="mb-10">
                    <h2 className="font-display text-xl text-ink mb-4">
                        Customers also viewed
                    </h2>
                    <RelatedProducts products={alsoViewed} />
                </section>
            )}

            {/* Footnotes */}
            {(product.bulletsFootnotes?.length || product.specsFootnotes?.length) ? (
                <section className="border-t border-border pt-6 mt-6">
                    <h2 className="text-xs uppercase tracking-wide text-ink-muted mb-3">
                        Footnotes
                    </h2>
                    <div className="fine-print space-y-1.5">
                        {product.bulletsFootnotes?.map((f, i) => (
                            <p key={`b-${i}`}>
                                <span className="font-mono text-ink-muted mr-1">{f.marker}</span>
                                {f.text}
                            </p>
                        ))}
                        {product.specsFootnotes?.map((f, i) => (
                            <p key={`s-${i}`}>
                                <span className="font-mono text-ink-muted mr-1">{f.marker}</span>
                                {f.text}
                            </p>
                        ))}
                    </div>
                </section>
            ) : null}
        </div>
    )
}