import Link from 'next/link';

export default function CTASection() {
  return (
    <section className='bg-background py-16'>
      <div className='mx-auto max-w-7xl px-6'>
        <div
          className='rounded-3xl border border-accent/20 p-12 text-center md:p-16'
          style={{
            background: 'linear-gradient(135deg, rgba(255,107,0,0.08) 0%, rgba(255,107,0,0.02) 100%)',
          }}
        >
          <span className='mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-accent'>
            Ready to Drive
          </span>
          <h2 className='mb-4 text-3xl font-extrabold text-foreground md:text-5xl'>
            Experience Luxury on Your Terms
          </h2>
          <p className='mx-auto mb-8 max-w-md text-base leading-relaxed text-muted'>
            From everyday drives to special occasions, Rentola lets you choose the car that matches your moment.
          </p>
          <div className='flex flex-col items-center gap-4 sm:flex-row sm:justify-center'>
            <Link
              href='/cars'
              className='inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/20'
            >
              Browse Our Cars
              <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
                <line x1='5' y1='12' x2='19' y2='12'/><polyline points='12 5 19 12 12 19'/>
              </svg>
            </Link>
            <Link
              href='/contact'
              className='inline-flex items-center rounded-full border border-border px-8 py-3.5 text-sm font-semibold text-foreground transition-all hover:border-accent hover:text-accent'
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
