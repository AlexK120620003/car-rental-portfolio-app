import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import React, { ReactNode } from 'react';

export default async function AdminLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const session = await auth();
  if (!session) redirect('/login');
  if (session.user.role !== 'ADMIN') redirect('/dashboard');
  return (
    <div className='flex min-h-screen bg-zinc-950'>
      <aside className='w-56 border-r border-zinc-800 bg-zinc-900 p-6'>
        <p className='mb-6 text-xs font-semibold uppercase tracking-wider text-zinc-400'>
          Admin Panel
        </p>
        <nav className='space-y-1'>
          <Link
            href='/admin'
            className='block rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white'
          >
            Overview
          </Link>
          <Link
            href='/admin/cars'
            className='block rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white'
          >
            Cars
          </Link>
          <Link
            href='/admin/bookings'
            className='block rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white'
          >
            Bookings
          </Link>
        </nav>
      </aside>
      <main className='flex-1 p-8'>{children}</main>
    </div>
  );
}
