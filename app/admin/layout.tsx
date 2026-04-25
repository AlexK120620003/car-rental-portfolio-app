import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import React, { ReactNode } from 'react';
import AdminNav from './AdminNav';

export default async function AdminLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const session = await auth();
  if (!session) redirect('/login');
  if (session.user.role !== 'ADMIN') redirect('/dashboard');

  return (
    <div className='flex min-h-screen bg-background'>
      <aside className='w-56 shrink-0 border-r border-border bg-surface flex flex-col py-6 px-3'>
        <div className='px-3 mb-1'>
          <Link href='/' className='text-lg font-extrabold text-accent'>
            Rentola
          </Link>
        </div>
        <p className='px-3 mb-6 text-xs font-bold uppercase tracking-widest text-muted'>
          Admin Panel
        </p>

        <nav className='flex flex-col gap-1'>
          <AdminNav />
        </nav>

        <div className='mt-auto border-t border-border pt-4 px-3 flex items-center gap-3'>
          <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent text-xs font-bold text-white'>
            AD
          </div>
          <div className='min-w-0 flex-1'>
            <p className='text-xs font-semibold text-foreground'>Admin</p>
            <p className='truncate text-xs text-muted'>{session.user?.email}</p>
          </div>
        </div>
      </aside>

      <main className='flex-1 overflow-y-auto p-8'>{children}</main>
    </div>
  );
}
