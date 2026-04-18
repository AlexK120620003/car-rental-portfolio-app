'use client';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <section className='flex min-h-[60vh] items-center justify-center bg-background'>
      <div className='text-center'>
        <h2 className='text-2xl font-bold text-foreground'>
          Something went wrong
        </h2>
        <p className='mt-2 text-muted'>{error.message}</p>
        <button
          onClick={reset}
          className='mt-6 rounded-lg bg-accent px-6 py-3 font-medium text-white transition-opacity hover:opacity-90'
        >
          Try Again
        </button>
      </div>
    </section>
  );
}
