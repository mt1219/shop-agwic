import type { QA } from '@/lib/products/types'

export function QASection({ qa }: { qa: QA[] }) {
    return (
        <section>
            <h2 className="font-display text-xl text-ink mb-3">
                Questions &amp; Answers
            </h2>
            <div className="space-y-4">
                {qa.map((q, i) => (
                    <div key={i} className="border-t border-border pt-3">
                        <p className="text-sm font-semibold text-ink mb-1">
                            Q: {q.question}
                        </p>
                        <p className="text-sm text-ink leading-relaxed">
                            A: {q.answer}
                        </p>
                        <p className="fine-print mt-1">Asked by {q.askedBy}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}