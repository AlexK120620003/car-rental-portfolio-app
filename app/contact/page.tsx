import { submitContact } from '@/app/lib/actions';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact-Us - Rentola',
  description: 'Contact us for any problems',
};

export default function ContactPage() {
  return (
    <section className='bg-background py-16'>
      <div className='mx-auto max-w-2xl px-6'>
        <div className='mb-12'>
          <span className='mb-2 block text-sm font-medium uppercase tracking-widest text-accent'>
            Get In Touch
          </span>
          <h1 className='text-4xl font-bold text-foreground md:text-5xl'>
            Contact Us
          </h1>
          <p className='mt-4 text-muted'>
            Have a question or need help? Send us a message and we&apos;ll get back
            to you as soon as possible.
          </p>
        </div>

        <form action={submitContact} className='space-y-6'>
          <div>
            <label htmlFor='name' className='mb-1 block text-sm text-muted'>
              Name
            </label>
            <input
              type='text'
              id='name'
              name='name'
              required
              className='w-full rounded-lg border border-muted/30 bg-card px-4 py-3 text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none'
              placeholder='Your name'
            />
          </div>

          <div>
            <label htmlFor='email' className='mb-1 block text-sm text-muted'>
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              required
              className='w-full rounded-lg border border-muted/30 bg-card px-4 py-3 text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none'
              placeholder='your@email.com'
            />
          </div>

          <div>
            <label htmlFor='message' className='mb-1 block text-sm text-muted'>
              Message
            </label>
            <textarea
              id='message'
              name='message'
              required
              rows={5}
              className='w-full rounded-lg border border-muted/30 bg-card px-4 py-3 text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none'
              placeholder='How can we help you?'
            />
          </div>

          <button
            type='submit'
            className='w-full rounded-lg bg-accent py-3 font-medium text-white transition-opacity hover:opacity-90'
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
