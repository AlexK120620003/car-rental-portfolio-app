import Link from 'next/link';

export default function Hero() {
  return (
    <section className='relative overflow-hidden bg-background'>
      <div className='mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center md:py-32'>
        <span className='mb-4 text-sm font-medium uppercase tracking-widest text-accent'>
          Premium Car Rental
        </span>

        <h1 className='mb-6 text-4xl font-bold leading-tight md:text-6xl lg:text-7xl'>
          Rent Your <span className='text-accent'>Dream Car</span>
          <br />
          Anytime, Anywhere
        </h1>

        <p className='mb-10 max-w-2xl text-base text-muted md:text-lg'>
          Explore our premium collection of cars. From luxury sedans to sports
          cars — find the perfect ride for your next journey.
        </p>

        <div className='flex flex-col gap-4 sm:flex-row'>
          <Link
            href='/cars'
            className='rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover'
          >
            Browse Cars
          </Link>
          <Link
            href='/about'
            className='rounded-full border border-border px-8 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent'
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
