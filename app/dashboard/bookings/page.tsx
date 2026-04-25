export const dynamic = 'force-dynamic';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import prisma from '@/app/lib/prisma';
import { cancelBooking } from '@/app/lib/actions';
import type { BookingStatus } from '@/app/lib/types';

const statusStyles: Record<BookingStatus, string> = {
  CONFIRMED: 'bg-green-soft text-green',
  COMPLETED: 'bg-blue-soft text-blue',
  CANCELLED: 'bg-red-soft text-red',
  PENDING: 'bg-yellow-soft text-yellow',
};

export default async function Bookings() {
  const session = await auth();
  if (!session) redirect('/login');

  const bookings = await prisma.booking.findMany({
    where: { userId: session.user?.id },
    include: { car: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <h1 className='text-2xl font-extrabold text-foreground mb-1'>My Bookings</h1>
      <p className='text-sm text-muted mb-8'>{bookings.length} total booking{bookings.length !== 1 && 's'}</p>

      {bookings.length === 0 ? (
        <div className='rounded-2xl border border-border bg-surface p-12 text-center'>
          <p className='text-muted text-sm mb-3'>No bookings yet.</p>
          <a href='/cars' className='text-sm font-semibold text-accent hover:underline'>
            Browse cars →
          </a>
        </div>
      ) : (
        <div className='flex flex-col gap-3'>
          {bookings.map(booking => (
            <div
              key={booking.id}
              className='flex items-center gap-5 rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent/40'
            >
              <div className='flex-1 min-w-0'>
                <h3 className='font-semibold text-foreground'>
                  {booking.car.brand} {booking.car.model}
                </h3>
                <p className='mt-1 text-xs text-muted'>
                  {new Date(booking.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  {' → '}
                  {new Date(booking.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>

              <div className='flex items-center gap-3 shrink-0'>
                <span className='text-lg font-extrabold text-foreground'>
                  ${booking.totalPrice}
                </span>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[booking.status as BookingStatus]}`}>
                  {booking.status}
                </span>
                {booking.status !== 'CANCELLED' && booking.status !== 'COMPLETED' && (
                  <form action={cancelBooking}>
                    <input type='hidden' name='bookingId' value={booking.id} />
                    <button className='rounded-full border border-red px-3 py-1 text-xs font-semibold text-red transition-colors hover:bg-red hover:text-white'>
                      Cancel
                    </button>
                  </form>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
