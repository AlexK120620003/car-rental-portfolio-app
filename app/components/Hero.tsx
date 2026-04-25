import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className='relative overflow-hidden pt-16'>
      {/* Dark theme background */}
      <div className='hero-bg-dark absolute inset-0 -z-10'>
        <Image
          src='/images/Rentola-home-hero-dark.png'
          alt='Luxury car on a rainy city street at night'
          fill
          priority
          className='object-cover object-center'
          sizes='100vw'
        />
        <div className='absolute inset-0 bg-black/55' aria-hidden='true' />
      </div>

      {/* Light theme background */}
      <div className='hero-bg-light absolute inset-0 -z-10'>
        <Image
          src='/images/Rentola-home-hero-light.png'
          alt='Luxury car on a city street at sunset'
          fill
          priority
          className='object-cover object-center'
          sizes='100vw'
        />
        <div className='absolute inset-0 bg-black/30' aria-hidden='true' />
      </div>

      {/* Orange glow */}
      <div
        className='pointer-events-none absolute inset-0 -z-10'
        style={{
          background:
            'radial-gradient(ellipse 80% 40% at 50% 100%, rgba(255,107,0,0.10) 0%, transparent 70%)',
        }}
        aria-hidden='true'
      />

      <div className='mx-auto flex max-w-7xl flex-col items-center px-6 py-28 text-center md:py-36'>
        <span className='animate-fade-up mb-4 inline-block rounded-full border border-white/30 bg-black/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-sm'>
          Premium Car Rental
        </span>

        <h1 className='animate-fade-up animation-delay-100 mb-6 text-5xl font-extrabold leading-tight tracking-tight text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.6)] md:text-6xl lg:text-7xl'>
          Find the Perfect Car
          <br />
          <span className='text-accent'>for Every Trip</span>
        </h1>

        <p className='animate-fade-up animation-delay-200 mb-10 max-w-xl text-base leading-relaxed text-white/80 [text-shadow:0_1px_8px_rgba(0,0,0,0.5)] md:text-lg'>
          Rentola gives you access to premium cars at transparent prices. Choose
          your ride, pick your dates, and hit the road in minutes.
        </p>

        <div className='animate-fade-up animation-delay-300 flex flex-col gap-4 sm:flex-row'>
          <Link
            href='/cars'
            className='inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/30'
          >
            Browse Cars
            <svg
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              aria-hidden='true'
            >
              <line x1='5' y1='12' x2='19' y2='12' />
              <polyline points='12 5 19 12 12 19' />
            </svg>
          </Link>
          <Link
            href='/about'
            className='inline-flex items-center gap-2 rounded-full border border-white/40 bg-black/20 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-accent hover:text-accent'
          >
            How It Works
          </Link>
        </div>

        {/* Stats row */}
        <div className='animate-fade-up animation-delay-400 mt-16 grid grid-cols-3 gap-8 border-t border-white/20 pt-10 sm:gap-16'>
          {[
            { value: '50+', label: 'Premium Cars' },
            { value: '1k+', label: 'Happy Clients' },
            { value: '4.9', label: 'Average Rating' },
          ].map(stat => (
            <div key={stat.label} className='text-center'>
              <div className='text-2xl font-extrabold text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.5)] md:text-3xl'>
                {stat.value}
              </div>
              <div className='mt-1 text-xs text-white/60'>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
