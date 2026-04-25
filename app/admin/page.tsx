import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import prisma from '@/app/lib/prisma';

export default async function Admin() {
  const session = await auth();
  if (!session) redirect('/login');
  if (session.user.role !== 'ADMIN') redirect('/dashboard');

  const [carsCount, bookingsCount, usersCount, bookingsData] = await Promise.all([
    prisma.car.count(),
    prisma.booking.count(),
    prisma.user.count(),
    prisma.booking.findMany({
      where: { status: { not: 'CANCELLED' } },
      select: { totalPrice: true },
    }),
  ]);

  const revenue = bookingsData.reduce((s, b) => s + b.totalPrice, 0);

  const stats = [
    { label: 'Total Cars', value: carsCount, color: 'text-accent' },
    { label: 'Total Bookings', value: bookingsCount, color: 'text-foreground' },
    { label: 'Total Users', value: usersCount, color: 'text-foreground' },
    { label: 'Revenue', value: `$${revenue.toLocaleString()}`, color: 'text-green' },
  ];

  const recentBookings = await prisma.booking.findMany({
    include: { car: true, user: true },
    orderBy: { createdAt: 'desc' },
    take: 5,
  });

  const statusStyles: Record<string, string> = {
    CONFIRMED: 'bg-green-soft text-green',
    COMPLETED: 'bg-blue-soft text-blue',
    CANCELLED: 'bg-red-soft text-red',
    PENDING: 'bg-yellow-soft text-yellow',
  };

  return (
    <div>
      <h1 className='text-2xl font-extrabold text-foreground mb-1'>Dashboard</h1>
      <p className='text-sm text-muted mb-8'>Overview of your rental business</p>

      {/* Stats */}
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8'>
        {stats.map(s => (
          <div key={s.label} className='rounded-2xl border border-border bg-surface p-5'>
            <p className='text-xs text-muted mb-2'>{s.label}</p>
            <p className={`text-3xl font-extrabold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Recent bookings */}
      <h2 className='text-lg font-bold text-foreground mb-4'>Recent Bookings</h2>
      <div className='rounded-2xl border border-border bg-surface overflow-hidden'>
        <table className='w-full text-sm'>
          <thead>
            <tr className='border-b border-border'>
              <th className='px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted'>User</th>
              <th className='px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted'>Car</th>
              <th className='px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted'>Total</th>
              <th className='px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted'>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentBookings.map(b => (
              <tr key={b.id} className='border-b border-border last:border-0 hover:bg-surface-alt transition-colors'>
                <td className='px-5 py-3'>
                  <p className='font-medium text-foreground'>{b.user.name}</p>
                  <p className='text-xs text-muted'>{b.user.email}</p>
                </td>
                <td className='px-5 py-3 text-foreground'>{b.car.brand} {b.car.model}</td>
                <td className='px-5 py-3 font-semibold text-foreground'>${b.totalPrice}</td>
                <td className='px-5 py-3'>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[b.status] ?? 'bg-surface-alt text-muted'}`}>
                    {b.status}
                  </span>
                </td>
              </tr>
            ))}
            {recentBookings.length === 0 && (
              <tr><td colSpan={4} className='px-5 py-8 text-center text-sm text-muted'>No bookings yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
