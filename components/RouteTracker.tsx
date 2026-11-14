'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { trackClick } from '@/lib/track-click'

/**
 * Fires a page-view event on every route change (App Router).
 * Mount once in app/layout.tsx.
 */
export function RouteTracker() {
    const pathname = usePathname()

    useEffect(() => {
        trackClick('page-view', {
            page: pathname,
            referrer: typeof document !== 'undefined' ? document.referrer || 'direct' : 'direct',
        })
    }, [pathname])

    return null
}