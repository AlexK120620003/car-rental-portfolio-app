import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import prisma from '@/app/lib/prisma';
import { updateCar } from '@/app/lib/actions';

export default async function EditCar({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();
  if (!session) redirect('/login');
  if (session.user.role !== 'ADMIN') redirect('/dashboard');
  const car = await prisma.car.findUnique({ where: { id } });
  if (!car) redirect('/admin/cars');

  return (
    <div className='max-w-lg'>
      <h1 className='mb-8 text-2xl font-bold text-white'>Edit Car</h1>
      <form
        action={updateCar}
        className='space-y-4 rounded-xl border border-zinc-800 bg-zinc-900 p-6'
      >
        <input type='hidden' name='id' value={car.id} />
        <div>
          <label className='mb-1 block text-sm text-zinc-400'>Brand</label>
          <input
            type='text'
            name='brand'
            defaultValue={car.brand}
            className='w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-white focus:border-orange-500 focus:outline-none'
          />
        </div>
        <div>
          <label className='mb-1 block text-sm text-zinc-400'>Model</label>
          <input
            type='text'
            name='model'
            defaultValue={car.model}
            className='w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-white focus:border-orange-500 focus:outline-none'
          />
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='mb-1 block text-sm text-zinc-400'>Year</label>
            <input
              type='number'
              name='year'
              defaultValue={car.year}
              className='w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-white focus:border-orange-500 focus:outline-none'
            />
          </div>
          <div>
            <label className='mb-1 block text-sm text-zinc-400'>
              Price/day
            </label>
            <input
              type='number'
              name='pricePerDay'
              defaultValue={car.pricePerDay}
              className='w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-white focus:border-orange-500 focus:outline-none'
            />
          </div>
        </div>
        <div>
          <label className='mb-1 block text-sm text-zinc-400'>Category</label>
          <select
            name='category'
            defaultValue={car.category}
            className='w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-white focus:border-orange-500 focus:outline-none'
          >
            <option value='SEDAN'>Sedan</option>
            <option value='SUV'>SUV</option>
            <option value='SPORTS'>Sports</option>
            <option value='ELECTRIC'>Electric</option>
            <option value='LUXURY'>Luxury</option>
          </select>
        </div>
        <div>
          <label className='mb-1 block text-sm text-zinc-400'>Image URL</label>
          <input
            type='text'
            name='image'
            defaultValue={car.image}
            className='w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-white focus:border-orange-500 focus:outline-none'
          />
        </div>
        <div>
          <label className='mb-1 block text-sm text-zinc-400'>
            Description
          </label>
          <input
            type='text'
            name='description'
            defaultValue={car.description}
            className='w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-white focus:border-orange-500 focus:outline-none'
          />
        </div>
        <button
          type='submit'
          className='w-full rounded-lg bg-orange-500 py-2 text-sm font-medium text-white hover:bg-orange-600'
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
