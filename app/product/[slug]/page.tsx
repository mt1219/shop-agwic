import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import type { Metadata } from 'next'
import { getProduct, getRelatedProducts, products } from '@/lib/products'
import { getCategory } from '@/lib/categories'
import { ProductDetail } from '@/components/product/ProductDetail'

export async function generateStaticParams() {
    return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params
    const product = getProduct(slug)
    if (!product) return {}
    return {
        title: product.name,
        description: product.blurb,
        openGraph: {
            title: product.name,
            description: product.blurb,
            images: product.heroPath ? [{ url: product.heroPath }] : undefined,
        },
    }
}

export default function ProductPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    return (
        <Suspense fallback={<ProductSkeleton />}>
            <ProductContent params={params} />
        </Suspense>
    )
}

async function ProductContent({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const product = getProduct(slug)
    if (!product) notFound()

    const category = getCategory(product.category)
    const related = getRelatedProducts(product)
    // "Customers also viewed" — related or same-category fallback
    const alsoViewed =
        related.length > 0
            ? related
            : products
                .filter((p) => p.category === product.category && p.slug !== product.slug)
                .slice(0, 4)

    return (
        <ProductDetail
            product={product}
            categoryName={category?.name}
            related={related}
            alsoViewed={alsoViewed}
        />
    )
}

function ProductSkeleton() {
    return (
        <div className="mx-auto max-w-7xl px-4 py-8">
            <div className="h-4 w-48 bg-stripe rounded mb-6" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="aspect-square bg-stripe rounded" />
                <div className="space-y-3">
                    <div className="h-8 bg-stripe rounded w-2/3" />
                    <div className="h-4 bg-stripe rounded w-1/3" />
                    <div className="h-6 bg-stripe rounded w-1/4 mt-4" />
                    <div className="h-10 bg-stripe rounded w-full mt-4" />
                </div>
            </div>
        </div>
    )
}