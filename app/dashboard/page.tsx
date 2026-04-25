export const dynamic = 'force-dynamic';
import { auth } from '@/auth';
import prisma from '../lib/prisma';
import Link from 'next/link';
import type { BookingStatus } from '../lib/types';

const statusStyles: Record<BookingStatus, string> = {
  CONFIRMED: 'bg-green-soft text-green border-green/20',
  COMPLETED: 'bg-blue-soft text-blue border-blue/20',
  CANCELLED: 'bg-red-soft text-red border-red/20',
  PENDING: 'bg-yellow-soft text-yellow border-yellow/20',
};

export default async function Dashboard() {
  const session = await auth();

  const bookings = await prisma.booking.findMany({
    where: { userId: session?.user?.id },
    include: { car: true },
    orderBy: { createdAt: 'desc' },
  });

  const active = bookings.filter(b => b.status === 'CONFIRMED' || b.status === 'PENDING').length;
  const completed = bookings.filter(b => b.status === 'COMPLETED').length;
  const totalSpent = bookings
    .filter(b => b.status !== 'CANCELLED')
    .reduce((s, b) => s + b.totalPrice, 0);

  const upcoming = bookings.filter(b => b.status === 'CONFIRMED' || b.status === 'PENDING').slice(0, 3);

  const stats = [
    { label: 'Active Bookings', value: active, color: 'text-accent' },
    { label: 'Completed', value: completed, color: 'text-green' },
    { label: 'Total Spent', value: `$${totalSpent.toLocaleString()}`, color: 'text-foreground' },
    { label: 'Total Bookings', value: bookings.length, color: 'text-foreground' },
  ];

  return (
    <div>
      <h1 className='text-2xl font-extrabold text-foreground'>
        Welcome back, {session?.user?.name?.split(' ')[0]}
      </h1>
      <p className='mt-1 mb-8 text-sm text-muted'>Here&apos;s your rental overview</p>

      {/* Stats */}
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8'>
        {stats.map(s => (
          <div key={s.label} className='rounded-2xl border border-border bg-surface p-5'>
            <p className='text-xs text-muted mb-2'>{s.label}</p>
            <p className={`text-3xl font-extrabold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Upcoming */}
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-lg font-bold text-foreground'>Upcoming Trips</h2>
        <Link href='/dashboard/bookings' className='text-sm text-accent hover:underline'>
          View all →
        </Link>
      </div>

      {upcoming.length === 0 ? (
        <div className='rounded-2xl border border-border bg-surface p-8 text-center'>
          <p className='text-muted text-sm'>No upcoming trips.</p>
          <Link href='/cars' className='mt-3 inline-block text-sm font-semibold text-accent hover:underline'>
            Browse cars →
          </Link>
        </div>
      ) : (
        <div className='flex flex-col gap-3'>
          {upcoming.map(booking => (
            <div
              key={booking.id}
              className='flex items-center justify-between rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent/40'
            >
              <div>
                <p className='font-semibold text-foreground'>
                  {booking.car.brand} {booking.car.model}
                </p>
                <p className='mt-1 text-xs text-muted'>
                  {new Date(booking.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  {' → '}
                  {new Date(booking.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
              <div className='flex items-center gap-3'>
                <span className='text-base font-bold text-foreground'>${booking.totalPrice}</span>
                <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[booking.status as BookingStatus]}`}>
                  {booking.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
