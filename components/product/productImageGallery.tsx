'use client'

import { useState } from 'react';
import Image from 'next/image';

type Props = {
    images: string[];
    alt: string;
}

export default function ProductImageGallery({ images, alt }: Props) {
    const [selectedImage, setSelectedImage] = useState(images[0]);

    return (
        <div className="flex flex-col gap-4">
            <div className="aspect-square w-full relative overflow-hidden rounded-lg border bg-white shadow-sm">
                <Image
                    src={selectedImage}
                    alt={alt}
                    fill
                    loading="lazy"
                    style={{ objectFit: 'contain', padding: '1.5rem' }}
                    className="transition-opacity duration-300 ease-in-out"
                    priority
                    sizes="(max-width: 1024px) 90vw, 45vw"
                />
            </div>

            <div className="grid grid-cols-4 gap-4">
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedImage(image)}
                        className={`aspect-square relative rounded-md overflow-hidden transition-all duration-200
                            ${selectedImage === image
                            ? 'ring-2 ring-indigo-500 ring-offset-2'
                            : 'hover:opacity-80'
                        }`}
                    >
                        <Image
                            src={image}
                            alt={`${alt} thumbnail ${index + 1}`}
                            fill
                            loading="lazy"
                            style={{ objectFit: 'cover' }}
                            sizes="20vw"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}