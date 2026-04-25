export const dynamic = 'force-dynamic';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import prisma from '@/app/lib/prisma';
import { deleteCar } from '@/app/lib/actions';

export default async function AdminCarsPage() {
  const session = await auth();
  if (!session) redirect('/login');
  if (session.user.role !== 'ADMIN') redirect('/dashboard');

  const carsList = await prisma.car.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div>
      <div className='mb-8 flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-extrabold text-foreground'>Cars</h1>
          <p className='mt-1 text-sm text-muted'>{carsList.length} vehicles in fleet</p>
        </div>
        <Link
          href='/admin/cars/new'
          className='inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90'
        >
          <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' aria-hidden='true'>
            <line x1='12' y1='5' x2='12' y2='19'/><line x1='5' y1='12' x2='19' y2='12'/>
          </svg>
          Add Car
        </Link>
      </div>

      <div className='rounded-2xl border border-border bg-surface overflow-hidden'>
        <table className='w-full text-sm'>
          <thead>
            <tr className='border-b border-border'>
              {['Car', 'Year', 'Price/day', 'Category', 'Status', ''].map(h => (
                <th key={h} className='px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted'>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {carsList.map(car => (
              <tr key={car.id} className='border-b border-border last:border-0 hover:bg-surface-alt transition-colors'>
                <td className='px-5 py-3'>
                  <p className='font-semibold text-foreground'>{car.brand} {car.model}</p>
                </td>
                <td className='px-5 py-3 text-muted'>{car.year}</td>
                <td className='px-5 py-3 font-semibold text-foreground'>${car.pricePerDay}</td>
                <td className='px-5 py-3'>
                  <span className='rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent'>
                    {car.category}
                  </span>
                </td>
                <td className='px-5 py-3'>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${car.available ? 'bg-green-soft text-green' : 'bg-red-soft text-red'}`}>
                    {car.available ? 'Available' : 'Unavailable'}
                  </span>
                </td>
                <td className='px-5 py-3'>
                  <div className='flex items-center gap-2'>
                    <Link
                      href={`/admin/cars/${car.id}`}
                      className='rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-accent hover:text-foreground'
                    >
                      Edit
                    </Link>
                    <form action={deleteCar}>
                      <input type='hidden' name='id' value={car.id} />
                      <button
                        type='submit'
                        className='rounded-lg border border-red/30 bg-red-soft px-3 py-1.5 text-xs font-medium text-red transition-colors hover:bg-red hover:text-white'
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {carsList.length === 0 && (
              <tr><td colSpan={6} className='px-5 py-10 text-center text-sm text-muted'>No cars yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
