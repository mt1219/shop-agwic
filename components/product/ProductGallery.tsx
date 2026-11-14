'use client'

import { useState } from 'react'
import { productImageUrl } from '@/lib/images'

export function ProductGallery({
    heroPath,
    galleryPaths,
    name,
}: {
    heroPath: string
    galleryPaths: string[]
    name: string
}) {
    const images = [heroPath, ...galleryPaths].filter(Boolean)
    const [active, setActive] = useState(0)
    const current = images[active] ?? ''

    return (
        <div>
            <div className="aspect-square bg-stripe rounded overflow-hidden border border-border">
                <img
                    src={productImageUrl(current)}
                    alt={name}
                    className="w-full h-full object-cover"
                />
            </div>
            {images.length > 1 && (
                <div className="flex gap-2 mt-2">
                    {images.map((img, i) => (
                        <button
                            key={i}
                            onClick={() => setActive(i)}
                            className={`w-16 h-16 rounded overflow-hidden border transition-colors ${i === active ? 'border-ink' : 'border-border hover:border-ink-muted'
                                }`}
                            aria-label={`Image ${i + 1}`}
                        >
                            <img
                                src={productImageUrl(img)}
                                alt=""
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}