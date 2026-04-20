'use client';
import { useState } from 'react';
import { login } from '@/app/lib/actions';
export default function LoginForm() {
  const [error, setError] = useState('');
  return (
    <section className='bg-background py-16'>
      <div className='mx-auto max-w-md px-6'>
        <div className='mb-8 text-center'>
          <h1 className='text-3xl font-bold text-foreground'>Welcome Back</h1>
          <p className='mt-2 text-muted'>Sign in to your account</p>
        </div>

        <form action={login} className='space-y-5'>
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
            <label htmlFor='password' className='mb-1 block text-sm text-muted'>
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              required
              className='w-full rounded-lg border border-muted/30 bg-card px-4 py-3 text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none'
              placeholder='••••••••'
            />
          </div>

          {error && <p className='text-sm text-red-500'>{error}</p>}

          <button
            type='submit'
            className='w-full rounded-lg bg-accent py-3 font-medium text-white transition-opacity hover:opacity-90'
          >
            Sign In
          </button>
        </form>
      </div>
    </section>
  );
}
