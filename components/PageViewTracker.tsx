'use client'

import { useEffect, useRef } from 'react'
import { trackClick } from '@/lib/track-click'

export default function PageViewTracker({
    page,
    section,
    delay = 0,
}: {
    page: string
    section?: string
    delay?: number
}) {
    const fired = useRef(false)

    useEffect(() => {
        if (fired.current) return
        const run = () => {
            trackClick('page-view', {
                page,
                referrer: typeof document !== 'undefined' ? document.referrer || 'direct' : 'direct',
                metadata: section ? { section } : null,
            })
            fired.current = true
        }
        if (delay > 0) {
            const t = setTimeout(run, delay)
            return () => clearTimeout(t)
        }
        run()
    }, [page, section, delay])

    return null
}