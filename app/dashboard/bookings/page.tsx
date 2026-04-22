import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import prisma from '@/app/lib/prisma';
import { cancelBooking } from '@/app/lib/actions';

export default async function Bookings() {
  const session = await auth();
  if (!session) redirect('/login');

  const bookings = await prisma.booking.findMany({
    where: { userId: session.user?.id },
    include: { car: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <section className='bg-background py-16'>
      <div className='mx-auto max-w-4xl px-6'>
        <h1 className='mb-8 text-3xl font-bold text-foreground'>My Bookings</h1>

        {bookings.length === 0 ? (
          <p className='text-muted'>No bookings yet.</p>
        ) : (
          <div className='space-y-4'>
            {bookings.map(booking => (
              <div
                key={booking.id}
                className='flex items-center justify-between rounded-xl border border-muted/20 bg-card p-5'
              >
                <div>
                  <h3 className='font-semibold text-foreground'>
                    {booking.car.brand} {booking.car.model}
                  </h3>
                  <p className='mt-1 text-sm text-muted'>
                    {new Date(booking.startDate).toLocaleDateString()} →{' '}
                    {new Date(booking.endDate).toLocaleDateString()}
                  </p>
                </div>

                <div className='text-right'>
                  <span className='text-lg font-bold text-accent'>
                    ${booking.totalPrice}
                  </span>
                  <span className='mt-1 block rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent'>
                    {booking.status}
                  </span>
                  {booking.status !== 'CANCELLED' && (
                    <form action={cancelBooking}>
                      <input
                        type='hidden'
                        name='bookingId'
                        value={booking.id}
                      />
                      <button className='mt-2 rounded-full border border-red-500 px-3 py-1 text-xs text-red-500 transition-colors hover:bg-red-500 hover:text-white'>
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
    </section>
  );
}
