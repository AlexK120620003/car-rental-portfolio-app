import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import prisma from '@/app/lib/prisma';
import { updateBookingStatus } from '@/app/lib/actions';

const statusBadge: Record<string, string> = {
  PENDING: 'bg-yellow-500/10 text-yellow-400',
  CONFIRMED: 'bg-green-500/10 text-green-400',
  CANCELLED: 'bg-red-500/10 text-red-400',
  COMPLETED: 'bg-blue-500/10 text-blue-400',
};

export default async function AdminBookingsPage() {
  const session = await auth();
  if (!session) redirect('/login');
  if (session.user.role !== 'ADMIN') redirect('/dashboard');

  const bookings = await prisma.booking.findMany({
    include: { car: true, user: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold text-white'>Bookings</h1>
        <p className='mt-1 text-sm text-zinc-400'>{bookings.length} total</p>
      </div>

      <div className='rounded-xl border border-zinc-800 bg-zinc-900'>
        <table className='w-full text-sm'>
          <thead>
            <tr className='border-b border-zinc-800 text-left text-zinc-400'>
              <th className='px-4 py-3'>User</th>
              <th className='px-4 py-3'>Car</th>
              <th className='px-4 py-3'>Dates</th>
              <th className='px-4 py-3'>Total</th>
              <th className='px-4 py-3'>Status</th>
              <th className='px-4 py-3'>Change status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr
                key={booking.id}
                className='border-b border-zinc-800 last:border-0'
              >
                <td className='px-4 py-3'>
                  <p className='text-white'>{booking.user.name}</p>
                  <p className='text-xs text-zinc-500'>{booking.user.email}</p>
                </td>
                <td className='px-4 py-3 text-white'>
                  {booking.car.brand} {booking.car.model}
                  <p className='text-xs text-zinc-500'>{booking.car.year}</p>
                </td>
                <td className='px-4 py-3 text-zinc-400'>
                  <p>{booking.startDate.toLocaleDateString('en-GB')}</p>
                  <p>{booking.endDate.toLocaleDateString('en-GB')}</p>
                </td>
                <td className='px-4 py-3 text-zinc-400'>
                  ${booking.totalPrice.toFixed(2)}
                </td>
                <td className='px-4 py-3'>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusBadge[booking.status] ?? 'text-zinc-400'}`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className='px-4 py-3'>
                  <form action={updateBookingStatus} className='flex gap-2'>
                    <input type='hidden' name='id' value={booking.id} />
                    <select
                      name='status'
                      defaultValue={booking.status}
                      className='rounded-lg border border-zinc-700 bg-zinc-800 px-2 py-1 text-xs text-white focus:border-orange-500 focus:outline-none'
                    >
                      <option value='PENDING'>Pending</option>
                      <option value='CONFIRMED'>Confirmed</option>
                      <option value='CANCELLED'>Cancelled</option>
                      <option value='COMPLETED'>Completed</option>
                    </select>
                    <button
                      type='submit'
                      className='rounded-lg bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-400 hover:bg-orange-500/20'
                    >
                      Save
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {bookings.length === 0 && (
          <p className='px-4 py-8 text-center text-sm text-zinc-500'>
            No bookings yet.
          </p>
        )}
      </div>
    </div>
  );
}
