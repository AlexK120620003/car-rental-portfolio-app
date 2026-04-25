import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

const navItems = [
  {
    href: '/dashboard',
    label: 'Overview',
    icon: (
      <svg
        width='18'
        height='18'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        aria-hidden='true'
      >
        <path d='M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z' />
        <polyline points='9 22 9 12 15 12 15 22' />
      </svg>
    ),
  },
  {
    href: '/dashboard/bookings',
    label: 'My Bookings',
    icon: (
      <svg
        width='18'
        height='18'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        aria-hidden='true'
      >
        <rect x='3' y='4' width='18' height='18' rx='2' />
        <line x1='16' y1='2' x2='16' y2='6' />
        <line x1='8' y1='2' x2='8' y2='6' />
        <line x1='3' y1='10' x2='21' y2='10' />
      </svg>
    ),
  },
  {
    href: '/dashboard/profile',
    label: 'Profile',
    icon: (
      <svg
        width='18'
        height='18'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        aria-hidden='true'
      >
        <path d='M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2' />
        <circle cx='12' cy='7' r='4' />
      </svg>
    ),
  },
];

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  if (!session) redirect('/login');
  if (session.user.role === 'ADMIN') redirect('/admin');

  const initials = session.user?.name
    ? session.user.name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : '??';

  return (
    <div className='flex min-h-screen bg-background'>
      <aside className='w-60 shrink-0 border-r border-border bg-surface flex flex-col py-6 px-3'>
        <div className='px-3 mb-6'>
          <Link href='/' className='text-lg font-extrabold text-accent'>
            Rentola
          </Link>
          <p className='mt-0.5 text-xs font-semibold uppercase tracking-wider text-muted'>
            Dashboard
          </p>
        </div>

        <nav className='flex flex-col gap-1'>
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className='flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted transition-all hover:bg-surface-alt hover:text-foreground'
            >
              <span className='shrink-0'>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className='mt-auto border-t border-border pt-4 px-3 flex items-center gap-3'>
          <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent text-xs font-bold text-white'>
            {initials}
          </div>
          <div className='min-w-0 flex-1'>
            <p className='truncate text-sm font-semibold text-foreground'>
              {session.user?.name}
            </p>
            <p className='truncate text-xs text-muted'>{session.user?.email}</p>
          </div>
        </div>
      </aside>

      <main className='flex-1 overflow-y-auto p-8'>{children}</main>
    </div>
  );
}
