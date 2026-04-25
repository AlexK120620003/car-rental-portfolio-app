export const dynamic = 'force-dynamic';
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
      <h1 className='mb-2 text-2xl font-extrabold text-foreground'>Edit Car</h1>
      <p className='mb-8 text-sm text-muted'>
        {car.brand} {car.model} &middot; {car.year}
      </p>
      <form
        action={updateCar}
        className='space-y-4 rounded-2xl border border-border bg-surface p-6'
      >
        <input type='hidden' name='id' value={car.id} />
        <div>
          <label className='mb-1 block text-sm font-medium text-muted'>
            Brand
          </label>
          <input
            type='text'
            name='brand'
            defaultValue={car.brand}
            className='w-full rounded-xl border border-border bg-surface-alt px-4 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none'
          />
        </div>
        <div>
          <label className='mb-1 block text-sm font-medium text-muted'>
            Model
          </label>
          <input
            type='text'
            name='model'
            defaultValue={car.model}
            className='w-full rounded-xl border border-border bg-surface-alt px-4 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none'
          />
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='mb-1 block text-sm font-medium text-muted'>
              Year
            </label>
            <input
              type='number'
              name='year'
              defaultValue={car.year}
              className='w-full rounded-xl border border-border bg-surface-alt px-4 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none'
            />
          </div>
          <div>
            <label className='mb-1 block text-sm font-medium text-muted'>
              Price/day
            </label>
            <input
              type='number'
              name='pricePerDay'
              defaultValue={car.pricePerDay}
              className='w-full rounded-xl border border-border bg-surface-alt px-4 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none'
            />
          </div>
        </div>
        <div>
          <label className='mb-1 block text-sm font-medium text-muted'>
            Category
          </label>
          <select
            name='category'
            defaultValue={car.category}
            className='w-full rounded-xl border border-border bg-surface-alt px-4 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none'
          >
            <option value='SEDAN'>Sedan</option>
            <option value='SUV'>SUV</option>
            <option value='SPORTS'>Sports</option>
            <option value='ELECTRIC'>Electric</option>
            <option value='LUXURY'>Luxury</option>
          </select>
        </div>
        <div>
          <label className='mb-1 block text-sm font-medium text-muted'>
            Image URL
          </label>
          <input
            type='text'
            name='image'
            defaultValue={car.image}
            className='w-full rounded-xl border border-border bg-surface-alt px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none'
          />
        </div>
        <div>
          <label className='mb-1 block text-sm font-medium text-muted'>
            Description
          </label>
          <textarea
            name='description'
            defaultValue={car.description}
            rows={3}
            className='w-full resize-none rounded-xl border border-border bg-surface-alt px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none'
          />
        </div>
        <button
          type='submit'
          className='w-full rounded-xl bg-accent py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90'
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
