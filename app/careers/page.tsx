import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Careers at AGWIC',
    description: 'We are not hiring.',
}

export default function CareersPage() {
    return (
        <article className="mx-auto max-w-3xl px-4 py-12">
            <h1 className="font-display text-3xl md:text-4xl text-ink mb-6">
                Careers at AGWIC
            </h1>

            <div className="space-y-6 text-ink leading-relaxed text-sm">
                <p className="text-base font-semibold">
                    We have 0 openings. We are not hiring.
                </p>

                <p>
                    AGWIC is a fully automated parody store. All positions have been
                    filled, and those positions were held by no one.
                </p>

                <p>
                    If you have already applied, please see{' '}
                    <a href="/legal/terms#section-7" className="text-primary underline underline-offset-2">
                        §7
                    </a>
                    . If you have not yet applied, please do not apply.
                </p>

                <p>
                    If you are a whistler, please see{' '}
                    <a href="/legal/terms#whistlers" className="text-primary underline underline-offset-2">
                        §8
                    </a>
                    . If you are a squirrel, please see the{' '}
                    <a href="/product/humane-squirrel-eliminator" className="text-primary underline underline-offset-2">
                        Humane Squirrel Eliminator™
                    </a>
                    .
                </p>

                <p className="fine-print pt-6 border-t border-border">
                    AGWIC is an equal opportunity non-employer. All applicants will
                    receive equal consideration, which is to say, no consideration.
                </p>
            </div>
        </article>
    )
}