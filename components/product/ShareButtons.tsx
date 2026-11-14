'use client'

import { useState, useEffect } from 'react'
import { trackClick } from '@/lib/track-click'

export function ShareButtons({ product }: { product: { slug: string; name: string; blurb: string } }) {
    const [url, setUrl] = useState('')
    const [copied, setCopied] = useState(false)

    // Read the URL after mount — never during SSR
    useEffect(() => {
        setUrl(window.location.href)
    }, [])

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(url)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
            trackClick('share-click', { product_slug: product.slug, metadata: { network: 'copy' } })
        } catch {
            // ignore
        }
    }

    const networks = [
        {
            name: 'Facebook',
            icon: 'f',
            build: (u: string) =>
                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}`,
        },
        {
            name: 'X',
            icon: '𝕏',
            build: (u: string) =>
                `https://twitter.com/intent/tweet?url=${encodeURIComponent(u)}&text=${encodeURIComponent(product.name)}`,
        },
        {
            name: 'Pinterest',
            icon: 'P',
            build: (u: string) =>
                `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(u)}&description=${encodeURIComponent(product.name)}`,
        },
    ]

    return (
        <div className="mt-4">
            <p className="text-xs uppercase tracking-wide text-ink-muted mb-2">Share</p>
            <div className="flex gap-2 flex-wrap">
                {networks.map((n) => (
                    <a
                        key={n.name}
                        href={n.build(url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                            trackClick('share-click', {
                                product_slug: product.slug,
                                metadata: { network: n.name.toLowerCase() },
                            })
                        }
                        className="inline-flex items-center gap-1.5 px-3 h-8 border border-border rounded text-xs text-ink hover:border-ink transition-colors"
                    >
                        <span className="font-mono">{n.icon}</span>
                        {n.name}
                    </a>
                ))}
                <button
                    onClick={copyLink}
                    className="inline-flex items-center gap-1.5 px-3 h-8 border border-border rounded text-xs text-ink hover:border-ink transition-colors"
                >
                    {copied ? 'Copied' : 'Copy link'}
                </button>
            </div>
        </div>
    )
}