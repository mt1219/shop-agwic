import type { CompareRow } from '@/lib/products/types'

export function CompareTable({ rows }: { rows: CompareRow[] }) {
    if (rows.length === 0) return null
    const attributeKeys = Array.from(
        new Set(rows.flatMap((r) => Object.keys(r.attributes))),
    )

    return (
        <section className="mb-10">
            <h2 className="font-display text-xl text-ink mb-4">
                Compare with similar items
            </h2>
            <div className="overflow-x-auto border border-border rounded">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-stripe border-b border-border">
                            <th className="p-2 text-left text-xs uppercase text-ink-muted">Name</th>
                            {attributeKeys.map((k) => (
                                <th key={k} className="p-2 text-left text-xs uppercase text-ink-muted">{k}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, i) => (
                            <tr
                                key={i}
                                className={row.highlight ? 'bg-stripe' : ''}
                            >
                                <td className="p-2 text-sm font-semibold text-ink">
                                    {row.name}
                                    {row.highlight && (
                                        <span className="ml-2 text-[10px] text-primary uppercase">
                                            This item
                                        </span>
                                    )}
                                </td>
                                {attributeKeys.map((k) => {
                                    const v = row.attributes[k]
                                    return (
                                        <td key={k} className="p-2 text-sm text-ink-muted">
                                            {typeof v === 'boolean' ? (v ? '✓' : '—') : v}
                                        </td>
                                    )
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}