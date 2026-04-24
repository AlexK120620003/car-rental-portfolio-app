import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import prisma from '@/app/lib/prisma';

export default async function Admin() {
  const session = await auth();
  if (!session) redirect('/login');
  if (session.user.role !== 'ADMIN') redirect('/dashboard');

  const [cars, bookings, users] = await Promise.all([
    prisma.car.count(),
    prisma.booking.count(),
    prisma.user.count(),
  ]);
  return (
    <div>
      <h1 className='mb-8 text-2xl font-bold text-white'>Overview</h1>
      <div className='grid grid-cols-3 gap-4'>
        <div className='rounded-xl border border-zinc-800 bg-zinc-900 p-6'>
          <p className='text-sm text-zinc-400'>Total Cars</p>
          <p className='mt-2 text-3xl font-bold text-white'>{cars}</p>
        </div>
        <div className='rounded-xl border border-zinc-800 bg-zinc-900 p-6'>
          <p className='text-sm text-zinc-400'>Total Bookings</p>
          <p className='mt-2 text-3xl font-bold text-white'>{bookings}</p>
        </div>
        <div className='rounded-xl border border-zinc-800 bg-zinc-900 p-6'>
          <p className='text-sm text-zinc-400'>Total Users</p>
          <p className='mt-2 text-3xl font-bold text-white'>{users}</p>
        </div>
      </div>
    </div>
  );
}
