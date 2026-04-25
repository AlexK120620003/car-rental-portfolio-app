const features = [
  {
    title: 'Unbeatable Prices',
    desc: 'Premium cars at clear, all-inclusive prices. No hidden fees, ever.',
    icon: (
      <svg width='22' height='22' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <circle cx='12' cy='12' r='10'/><line x1='12' y1='8' x2='12' y2='12'/><line x1='12' y1='16' x2='12.01' y2='16'/>
      </svg>
    ),
  },
  {
    title: 'Unlimited Miles',
    desc: 'Drive as far as you want on selected plans without worrying about extra charges.',
    icon: (
      <svg width='22' height='22' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <path d='M5 17h14M5 17a2 2 0 01-2-2V9a2 2 0 012-2h1l2-3h8l2 3h1a2 2 0 012 2v6a2 2 0 01-2 2M5 17a2 2 0 100 4 2 2 0 000-4zm14 0a2 2 0 100 4 2 2 0 000-4z'/>
      </svg>
    ),
  },
  {
    title: '24/7 Support',
    desc: 'Our team is always available — roadside assistance or booking changes, we\'ve got you.',
    icon: (
      <svg width='22' height='22' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <path d='M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z'/>
      </svg>
    ),
  },
];

export default function ComfortSection() {
  return (
    <section className='bg-background py-20'>
      <div className='mx-auto max-w-7xl px-6'>
        <div className='mb-12 max-w-2xl'>
          <span className='mb-2 block text-sm font-semibold uppercase tracking-widest text-accent'>
            Why Rentola
          </span>
          <h2 className='text-3xl font-extrabold leading-tight text-foreground md:text-4xl'>
            Ride to Your Destination With Maximum Comfort
          </h2>
          <p className='mt-4 text-base leading-relaxed text-muted'>
            Whether it&apos;s a business trip or a weekend escape, Rentola makes car rentals simple, safe, and comfortable.
          </p>
        </div>

        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {features.map((f, i) => (
            <div
              key={i}
              className='group rounded-2xl border border-border bg-surface p-7 transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5'
            >
              <div className='mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white'>
                {f.icon}
              </div>
              <h3 className='mb-2 text-base font-bold text-foreground'>{f.title}</h3>
              <p className='text-sm leading-relaxed text-muted'>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
