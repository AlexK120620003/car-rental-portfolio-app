import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  if (!session) redirect('/login');

  return (
    <div className='flex min-h-screen'>
      {/* Sidebar */}
      <aside className='w-64 border-r border-zinc-700 bg-zinc-900 p-6'>
        <h2 className='mb-6 text-lg font-bold text-orange-500'>Dashboard</h2>
        <nav className='flex flex-col gap-2'>
          <Link
            href='/dashboard'
            className='rounded-lg px-3 py-2 text-sm text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white'
          >
            Overview
          </Link>
          <Link
            href='/dashboard/bookings'
            className='rounded-lg px-3 py-2 text-sm text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white'
          >
            Bookings
          </Link>
          <Link
            href='/dashboard/profile'
            className='rounded-lg px-3 py-2 text-sm text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white'
          >
            Profile
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className='flex-1'>{children}</main>
    </div>
  );
}
