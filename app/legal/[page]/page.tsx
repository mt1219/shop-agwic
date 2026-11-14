import { Suspense } from 'react'
import { getLegalPage, legalPages } from '@/lib/legal'
import { cacheLife } from 'next/cache'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

async function getCurrentYear(): Promise<number> {
    'use cache'
    cacheLife('max')
    return new Date().getFullYear()
}

export async function generateStaticParams() {
    return Object.keys(legalPages).map((page) => ({ page }))
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ page: string }>
}): Promise<Metadata> {
    const { page } = await params
    const legal = getLegalPage(page)
    if (!legal) return {}
    return {
        title: legal.title,
        description: `${legal.title} for AGWIC.`,
    }
}

// The page shell doesn't await params — it just passes the promise down
export default function LegalPageRoute({
    params,
}: {
    params: Promise<{ page: string }>
}) {
    return (
        <Suspense fallback={<LegalPageSkeleton />}>
            <LegalPageContent params={params} />
        </Suspense>
    )
}

// The child awaits params inside the Suspense boundary
async function LegalPageContent({
    params,
}: {
    params: Promise<{ page: string }>
}) {
    const { page } = await params
    const legal = getLegalPage(page)
    if (!legal) notFound()

    const year = await getCurrentYear()

    return (
        <article className="mx-auto max-w-3xl px-4 py-12">
            <header className="mb-10">
                <h1 className="font-display text-3xl md:text-4xl text-ink mb-2">
                    {legal.title}
                </h1>
                <p className="fine-print">Last updated: {legal.lastUpdated}</p>
            </header>

            <div className="space-y-8 text-ink leading-relaxed">
                <p className="text-sm text-ink-muted">{legal.intro}</p>
                {legal.sections.map((section) => (
                    <section key={section.id} id={section.id}>
                        <h2 className="font-display text-xl text-ink mb-3">
                            {section.heading}
                        </h2>
                        {section.body.split('\n\n').map((para, i) => (
                            <p key={i} className="mb-3 text-sm leading-relaxed">
                                {para}
                            </p>
                        ))}
                    </section>
                ))}
            </div>

            <footer className="mt-12 pt-6 border-t border-border fine-print">
                <p>
                    © {year} Awesome Global Worldwide International Commercial Holdings
                    (Delaware). All rights reserved. All wrongs reversed.
                </p>
            </footer>
        </article>
    )
}

function LegalPageSkeleton() {
    return (
        <div className="mx-auto max-w-3xl px-4 py-12">
            <div className="h-8 bg-stripe rounded w-1/2 mb-4" />
            <div className="h-4 bg-stripe rounded w-1/4 mb-10" />
            <div className="space-y-4">
                <div className="h-4 bg-stripe rounded w-full" />
                <div className="h-4 bg-stripe rounded w-5/6" />
                <div className="h-4 bg-stripe rounded w-4/6" />
            </div>
        </div>
    )
}