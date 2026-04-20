'use server';
import prisma from './prisma';
import { auth, signIn } from '@/auth';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';

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
