import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import prisma from '@/app/lib/prisma';
import { deleteCar } from '@/app/lib/actions';

export default async function AdminCarsPage() {
  const session = await auth();
  if (!session) redirect('/login');
  if (session.user.role !== 'ADMIN') redirect('dashboard');
  const carsList = await prisma.car.findMany();
  return (
    <div>
      <div className='mb-6 flex items-center justify-between'>
        <h1 className='text-2xl font-bold text-white'>Cars</h1>
        <a
          href='/admin/cars/new'
          className='rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600'
        >
          Add Car
        </a>
      </div>
      <div className='rounded-xl border border-zinc-800 bg-zinc-900'>
        <table className='w-full text-sm'>
          <thead>
            <tr className='border-b border-zinc-800 text-left text-zinc-400'>
              <th className='px-4 py-3'>Brand</th>
              <th className='px-4 py-3'>Model</th>
              <th className='px-4 py-3'>Year</th>
              <th className='px-4 py-3'>Price/day</th>
              <th className='px-4 py-3'>Category</th>
              <th className='px-4 py-3'></th>
            </tr>
          </thead>
          <tbody>
            {carsList.map(car => (
              <tr
                key={car.id}
                className='border-b border-zinc-800 last:border-0'
              >
                <td className='px-4 py-3 text-white'>{car.brand}</td>
                <td className='px-4 py-3 text-white'>{car.model}</td>
                <td className='px-4 py-3 text-zinc-400'>{car.year}</td>
                <td className='px-4 py-3 text-zinc-400'>${car.pricePerDay}</td>
                <td className='px-4 py-3 text-zinc-400'>{car.category}</td>
                <td className='px-4 py-3'>
                  <div className='flex gap-2'>
                    <a
                      href={`/admin/cars/${car.id}`}
                      className='rounded-lg bg-zinc-700 px-3 py-1 text-xs font-medium text-zinc-300 hover:bg-zinc-600'
                    >
                      Edit
                    </a>
                    <form action={deleteCar}>
                      <input type='hidden' name='id' value={car.id} />
                      <button
                        type='submit'
                        className='rounded-lg bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400 hover:bg-red-500/20'
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
