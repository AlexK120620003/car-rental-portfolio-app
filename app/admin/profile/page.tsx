export const dynamic = 'force-dynamic';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import prisma from '@/app/lib/prisma';
import { updatePassword, updateUserName } from '@/app/lib/actions';

const inputClass =
  'w-full rounded-xl border border-border bg-surface-alt px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none transition-colors';
const labelClass =
  'block mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted';
const cardClass = 'rounded-2xl border border-border bg-surface p-6 mb-5';

export default async function AdminProfile() {
  const session = await auth();
  if (!session) redirect('/login');
  if (session.user.role !== 'ADMIN') redirect('/dashboard');

  const user = await prisma.user.findUnique({
    where: { id: session.user?.id },
  });
  if (!user) redirect('/login');

  const initials = user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className='max-w-lg'>
      <h1 className='text-2xl font-extrabold text-foreground mb-1'>Profile</h1>
      <p className='text-sm text-muted mb-8'>Manage your account settings</p>

      {/* Avatar card */}
      <div className={cardClass}>
        <div className='flex items-center gap-4 mb-6'>
          <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-lg font-extrabold text-white shrink-0'>
            {initials}
          </div>
          <div>
            <p className='font-semibold text-foreground'>{user.name}</p>
            <p className='text-sm text-muted'>{user.email}</p>
          </div>
        </div>

        <form action={updateUserName} className='flex gap-3'>
          <div className='flex-1'>
            <label htmlFor='name' className={labelClass}>
              Display Name
            </label>
            <input
              id='name'
              name='name'
              defaultValue={user.name}
              className={inputClass}
            />
          </div>
          <button
            type='submit'
            className='self-end rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90'
          >
            Save
          </button>
        </form>
      </div>

      {/* Password card */}
      <div className={cardClass}>
        <h2 className='text-sm font-bold text-foreground mb-5'>
          Change Password
        </h2>
        <form action={updatePassword} className='flex flex-col gap-4'>
          <div>
            <label htmlFor='currentPassword' className={labelClass}>
              Current Password
            </label>
            <input
              id='currentPassword'
              name='currentPassword'
              type='password'
              placeholder='••••••••'
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor='newPassword' className={labelClass}>
              New Password
            </label>
            <input
              id='newPassword'
              name='newPassword'
              type='password'
              placeholder='••••••••'
              className={inputClass}
            />
          </div>
          <button
            type='submit'
            className='w-full rounded-xl bg-accent py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90'
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
