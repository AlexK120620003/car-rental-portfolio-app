import Image from 'next/image';
import { getCars } from '../lib/cars';
import CatalogClient from '../components/CatalogClient';

export default async function CarsPage() {
  const cars = await getCars();

  return (
    <div className='min-h-screen bg-background'>
      {/* ── Banner ── */}
      <section className='relative h-64 overflow-hidden md:h-80 lg:h-96'>
        {/* Dark theme image */}
        <div className='hero-bg-dark absolute inset-0'>
          <Image
            src='/images/catalog-banner-dark.png'
            alt='Premium cars in a dark underground garage'
            fill
            priority
            className='object-cover object-center'
            sizes='100vw'
          />
          <div className='absolute inset-0 bg-black/50' aria-hidden='true' />
        </div>

        {/* Light theme image */}
        <div className='hero-bg-light absolute inset-0'>
          <Image
            src='/images/catalog-banner-light.png'
            alt='Premium cars in a bright underground garage'
            fill
            priority
            className='object-cover object-center'
            sizes='100vw'
          />
          <div className='absolute inset-0 bg-black/20' aria-hidden='true' />
        </div>

        {/* Orange glow */}
        <div
          className='pointer-events-none absolute inset-0'
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(255,107,0,0.12) 0%, transparent 70%)',
          }}
          aria-hidden='true'
        />

        {/* Banner text */}
        <div className='relative flex h-full flex-col items-center justify-center px-6 pt-16 text-center'>
          <span className='mb-3 inline-block rounded-full border border-white/30 bg-black/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-sm'>
            Our Fleet
          </span>
          <h1 className='text-4xl font-extrabold text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.6)] md:text-5xl lg:text-6xl'>
            Cars Collection
          </h1>
          <p className='mt-3 max-w-lg text-sm leading-relaxed text-white/75 [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]'>
            Browse our full collection of premium vehicles. Find the perfect car
            for your next trip.
          </p>
        </div>
      </section>

      {/* ── Catalog ── */}
      <section className='pb-20 pt-10'>
        <div className='mx-auto max-w-7xl px-6'>
          <CatalogClient cars={cars} />
        </div>
      </section>
    </div>
  );
}
