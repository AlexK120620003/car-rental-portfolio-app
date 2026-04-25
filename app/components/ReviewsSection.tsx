const reviews = [
  {
    name: 'Daniel Carter',
    role: 'Entrepreneur',
    text: 'Exceptional service from start to finish. The car was spotless, pickup was quick, and the entire booking experience felt premium.',
    stars: 5,
  },
  {
    name: 'Sophia Martinez',
    role: 'Travel Blogger',
    text: 'Rentola made my vacation unforgettable. The Ferrari I booked looked and felt brand-new. Highly recommended for luxury travel.',
    stars: 5,
  },
  {
    name: 'James Turner',
    role: 'Business Consultant',
    text: 'Smooth booking, transparent pricing, and amazing support. This is by far the best car rental experience I\'ve ever had.',
    stars: 5,
  },
];

function StarIcon() {
  return (
    <svg width='14' height='14' viewBox='0 0 24 24' fill='#FFB800' stroke='none' aria-hidden='true'>
      <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'/>
    </svg>
  );
}

export default function ReviewsSection() {
  return (
    <section className='bg-surface py-20'>
      <div className='mx-auto max-w-7xl px-6'>
        <div className='mb-12'>
          <span className='mb-2 block text-sm font-semibold uppercase tracking-widest text-accent'>
            Testimonials
          </span>
          <h2 className='text-3xl font-extrabold text-foreground md:text-4xl'>
            What Our Clients Say
          </h2>
          <p className='mt-4 max-w-xl text-base text-muted'>
            Real stories from people who chose Rentola for their journey.
          </p>
        </div>

        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {reviews.map((r, i) => (
            <div
              key={i}
              className='flex flex-col rounded-2xl border border-border bg-surface-alt p-7 transition-all duration-300 hover:border-accent/40 hover:shadow-md'
            >
              <div className='mb-4 flex gap-1'>
                {Array.from({ length: r.stars }).map((_, j) => (
                  <StarIcon key={j} />
                ))}
              </div>
              <p className='flex-1 text-sm leading-relaxed text-foreground'>
                &ldquo;{r.text}&rdquo;
              </p>
              <div className='mt-6 flex items-center gap-3 border-t border-border pt-5'>
                <div className='flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent'>
                  {r.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className='text-sm font-semibold text-foreground'>{r.name}</div>
                  <div className='text-xs text-muted'>{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
