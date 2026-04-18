export default function Loading() {
  return (
    <section className='bg-background py-16'>
      <div className='mx-auto max-w-7xl px-6'>
        <div className='mb-12'>
          <div className='h-4 w-24 animate-pulse rounded bg-muted/20' />
          <div className='mt-4 h-10 w-64 animate-pulse rounded bg-muted/20' />
        </div>
        <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className='h-80 animate-pulse rounded-2xl bg-muted/20'
            />
          ))}
        </div>
      </div>
    </section>
  );
}
