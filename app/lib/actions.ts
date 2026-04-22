'use server';
import prisma from './prisma';
import { auth, signIn } from '@/auth';
import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Prisma } from '../generated/prisma/client';

export async function submitContact(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  await prisma.contact.create({
    data: { name, email, message },
  });
}
export async function login(formData: FormData) {
  try {
    await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirectTo: '/dashboard',
    });
  } catch (error) {
    throw error;
  }
}

export async function register(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });
  redirect('/login');
}

export async function createBooking(formData: FormData) {
  const carId = formData.get('id') as string;
  const startDate = formData.get('startDate') as string;
  const endDate = formData.get('endDate') as string;
  const totalPrice = formData.get('totalPrice') as string;
  const session = await auth();
  if (!session?.user?.id) redirect('/login');

  await prisma.booking.create({
    data: {
      carId,
      userId: session.user.id,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      totalPrice: Number(totalPrice),
    },
  });
  redirect('/dashboard/bookings');
}

export async function cancelBooking(formData: FormData) {
  const bookingId = formData.get('bookingId') as string;

  if (!bookingId) {
    throw new Error('Booking id is required');
  }

  await prisma.booking.update({
    where: { id: bookingId },
    data: { status: 'CANCELLED' },
  });

  revalidatePath('/dashboard/bookings');
}

export async function updateUserName(formData: FormData) {
  const name = formData.get('name') as string;
  const session = await auth();
  if (!session) redirect('/login');
  await prisma.user.update({
    where: { id: session?.user?.id },
    data: { name },
  });
  revalidatePath('/dashboard/profile');
}

export async function updatePassword(formData: FormData) {
  const currentPassword = formData.get('currentPassword') as string;
  const newPassword = formData.get('newPassword') as string;

  const session = await auth();
  if (!session) redirect('/login');

  const user = await prisma.user.findUnique({
    where: { id: session.user?.id },
  });
  if (!user) redirect('/login');

  const isValid = await bcrypt.compare(currentPassword, user.password);
  if (!isValid) throw new Error(`Current password is incorrect`);

  const hashed = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashed },
  });

  revalidatePath('/dashboard/profile');
}
