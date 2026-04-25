export const dynamic = 'force-dynamic';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import prisma from '@/app/lib/prisma';
import { updateBookingStatus } from '@/app/lib/actions';

const statusStyles: Record<string, string> = {
  PENDING: 'bg-yellow-soft text-yellow',
  CONFIRMED: 'bg-green-soft text-green',
  CANCELLED: 'bg-red-soft text-red',
  COMPLETED: 'bg-blue-soft text-blue',
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
      <h1 className='text-2xl font-extrabold text-foreground mb-1'>Bookings</h1>
      <p className='text-sm text-muted mb-8'>{bookings.length} total</p>

      <div className='rounded-2xl border border-border bg-surface overflow-x-auto'>
        <table className='w-full text-sm min-w-175'>
          <thead>
            <tr className='border-b border-border'>
              {['User', 'Car', 'Dates', 'Total', 'Status', 'Action'].map(h => (
                <th key={h} className='px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted'>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking.id} className='border-b border-border last:border-0 hover:bg-surface-alt transition-colors'>
                <td className='px-5 py-3'>
                  <p className='font-medium text-foreground'>{booking.user.name}</p>
                  <p className='text-xs text-muted'>{booking.user.email}</p>
                </td>
                <td className='px-5 py-3'>
                  <p className='text-foreground'>{booking.car.brand} {booking.car.model}</p>
                  <p className='text-xs text-muted'>{booking.car.year}</p>
                </td>
                <td className='px-5 py-3 text-muted text-xs'>
                  <p>{booking.startDate.toLocaleDateString('en-GB')}</p>
                  <p>{booking.endDate.toLocaleDateString('en-GB')}</p>
                </td>
                <td className='px-5 py-3 font-semibold text-foreground'>
                  ${booking.totalPrice.toFixed(2)}
                </td>
                <td className='px-5 py-3'>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[booking.status] ?? 'bg-surface-alt text-muted'}`}>
                    {booking.status}
                  </span>
                </td>
                <td className='px-5 py-3'>
                  <form action={updateBookingStatus} className='flex items-center gap-2'>
                    <input type='hidden' name='id' value={booking.id} />
                    <select
                      name='status'
                      defaultValue={booking.status}
                      className='rounded-lg border border-border bg-surface-alt px-2 py-1.5 text-xs text-foreground focus:border-accent focus:outline-none'
                    >
                      <option value='PENDING'>Pending</option>
                      <option value='CONFIRMED'>Confirmed</option>
                      <option value='CANCELLED'>Cancelled</option>
                      <option value='COMPLETED'>Completed</option>
                    </select>
                    <button
                      type='submit'
                      className='rounded-lg bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent transition-colors hover:bg-accent hover:text-white'
                    >
                      Save
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr><td colSpan={6} className='px-5 py-10 text-center text-sm text-muted'>No bookings yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
