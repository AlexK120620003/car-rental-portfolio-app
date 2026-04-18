export default function AboutPage() {
  return (
    <section className='bg-background py-16'>
      <div className='mx-auto max-w-4xl px-6'>
        <div className='mb-12'>
          <span className='mb-2 block text-sm font-medium uppercase tracking-widest text-accent'>
            Who We Are
          </span>
          <h1 className='text-4xl font-bold text-foreground md:text-5xl'>
            About Rentola
          </h1>
        </div>

        <div className='space-y-6 text-lg leading-relaxed text-muted'>
          <p>
            Rentola is a premium car rental service dedicated to providing the
            best driving experience. Whether you need a reliable sedan for
            business or a luxury sports car for a weekend getaway, we have the
            perfect vehicle for you.
          </p>
          <p>
            Founded in 2024, we started with a simple mission: make premium car
            rental accessible and hassle-free. Our fleet includes carefully
            selected vehicles from top manufacturers, each maintained to the
            highest standards.
          </p>
          <p>
            We pride ourselves on transparent pricing, exceptional customer
            service, and a seamless booking experience. No hidden fees, no
            surprises — just great cars and great service.
          </p>
        </div>

        <div className='mt-16 grid gap-8 sm:grid-cols-3'>
          <div className='rounded-2xl border border-muted/20 bg-card p-8 text-center'>
            <p className='text-4xl font-bold text-accent'>50+</p>
            <p className='mt-2 text-sm text-muted'>Premium Vehicles</p>
          </div>
          <div className='rounded-2xl border border-muted/20 bg-card p-8 text-center'>
            <p className='text-4xl font-bold text-accent'>1000+</p>
            <p className='mt-2 text-sm text-muted'>Happy Customers</p>
          </div>
          <div className='rounded-2xl border border-muted/20 bg-card p-8 text-center'>
            <p className='text-4xl font-bold text-accent'>4.9</p>
            <p className='mt-2 text-sm text-muted'>Average Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
}
