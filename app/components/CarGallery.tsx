'use client';
import { useState } from 'react';
import Image from 'next/image';

interface CarGalleryProps {
  image: string;
  alt: string;
}

const ChevLeft = () => (
  <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round'>
    <polyline points='15 18 9 12 15 6'/>
  </svg>
);
const ChevRight = () => (
  <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round'>
    <polyline points='9 6 15 12 9 18'/>
  </svg>
);

// Since the DB stores only one image per car, we show it three times as gallery
// (in a real app you'd have a `images String[]` field in Prisma)
function buildGallery(image: string): string[] {
  return [image, image, image];
}

export default function CarGallery({ image, alt }: CarGalleryProps) {
  const gallery = buildGallery(image);
  const [idx, setIdx] = useState(0);

  const prev = () => setIdx((idx - 1 + gallery.length) % gallery.length);
  const next = () => setIdx((idx + 1) % gallery.length);

  return (
    <div>
      {/* Main image */}
      <div className='relative overflow-hidden rounded-2xl' style={{ aspectRatio: '16/10' }}>
        <Image
          src={gallery[idx]}
          alt={alt}
          fill
          priority
          className='object-cover transition-opacity duration-300'
          sizes='(min-width: 1024px) 60vw, 100vw'
        />

        {/* Nav arrows */}
        <button
          onClick={prev}
          className='absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70'
          aria-label='Previous image'
        >
          <ChevLeft />
        </button>
        <button
          onClick={next}
          className='absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70'
          aria-label='Next image'
        >
          <ChevRight />
        </button>
      </div>

      {/* Thumbnails */}
      <div className='mt-3 flex gap-2'>
        {gallery.map((img, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className='relative overflow-hidden rounded-xl transition-all'
            style={{
              width: 80,
              height: 56,
              border: i === idx ? '2px solid var(--accent)' : '2px solid transparent',
              opacity: i === idx ? 1 : 0.55,
            }}
          >
            <Image src={img} alt={`${alt} ${i + 1}`} fill className='object-cover' sizes='80px' />
          </button>
        ))}
      </div>
    </div>
  );
}
