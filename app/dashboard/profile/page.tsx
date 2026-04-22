import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import prisma from '@/app/lib/prisma';
import { updatePassword, updateUserName } from '@/app/lib/actions';

export default async function Profile() {
  const session = await auth();
  if (!session) redirect('/login');

  const user = await prisma.user.findUnique({
    where: { id: session.user?.id },
  });
  if (!user) redirect('/login');

  return (
    <section className='p-8'>
      <h1 className='mb-8 text-2xl font-bold text-white'>Profile</h1>

      <div className='max-w-md space-y-6'>
        <div className='rounded-xl border border-zinc-800 bg-zinc-900 p-6'>
          <h2 className='mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-400'>
            Display Name
          </h2>
          <form action={updateUserName} className='flex gap-3'>
            <input
              name='name'
              defaultValue={user.name}
              className='flex-1 rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-white placeholder-zinc-500 focus:border-orange-500 focus:outline-none'
            />
            <button
              type='submit'
              className='rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-600'
            >
              Save
            </button>
          </form>
        </div>

        <div className='rounded-xl border border-zinc-800 bg-zinc-900 p-6'>
          <h2 className='mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-400'>
            Change Password
          </h2>
          <form action={updatePassword} className='space-y-3'>
            <input
              name='currentPassword'
              type='password'
              placeholder='Current password'
              className='w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-white placeholder-zinc-500 focus:border-orange-500 focus:outline-none'
            />
            <input
              name='newPassword'
              type='password'
              placeholder='New password'
              className='w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-white placeholder-zinc-500 focus:border-orange-500 focus:outline-none'
            />
            <button
              type='submit'
              className='w-full rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-600'
            >
              Update password
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
