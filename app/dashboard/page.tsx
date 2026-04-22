import { auth } from '@/auth';
import prisma from '../lib/prisma';

export default async function Dashboard() {
  const session = await auth();

  const bookings = await prisma.booking.findMany({
    where: { userId: session?.user?.id },
    include: { car: true },
    orderBy: { createdAt: 'desc' },
    take: 3,
  });

  return (
    <div>
      <h1 className='mb-2 text-2xl font-bold text-white'>
        Welcome, {session?.user?.name}
      </h1>
      <p className='mb-8 text-zinc-400'>
        You have {bookings.length} recent booking{bookings.length !== 1 && 's'}
      </p>

      {bookings.length > 0 ? (
        <div className='grid gap-4'>
          {bookings.map(booking => (
            <div
              key={booking.id}
              className='flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 p-4'
            >
              <div>
                <p className='font-semibold text-white'>
                  {booking.car.brand} {booking.car.model}
                </p>
                <p className='text-sm text-zinc-400'>
                  {new Date(booking.startDate).toLocaleDateString()} —{' '}
                  {new Date(booking.endDate).toLocaleDateString()}
                </p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  booking.status === 'CONFIRMED'
                    ? 'bg-green-500/20 text-green-400'
                    : booking.status === 'CANCELLED'
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                }`}
              >
                {booking.status}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-zinc-500'>No bookings yet</p>
      )}
    </div>
  );
}
