'use client'

import Link from 'next/link'
import { trackClick, flushClicks } from '@/lib/track-click'

interface TrackedLinkProps {
    href: string
    children: React.ReactNode
    className?: string
    eventName: string
    extraData?: Record<string, unknown>
}

export default function TrackedLink({
    href,
    children,
    className,
    eventName,
    extraData = {},
}: TrackedLinkProps) {
    return (
        <Link
            href={href}
            className={className}
            onClick={() => {
                trackClick(eventName, {
                    metadata: {
                        ...extraData,
                        from_page: typeof window !== 'undefined' ? window.location.pathname : null,
                        link_href: href,
                    },
                })
                flushClicks()
            }}
        >
            {children}
        </Link>
    )
}