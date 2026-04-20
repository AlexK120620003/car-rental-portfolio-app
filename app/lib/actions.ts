'use server';
import prisma from './prisma';
import { signIn } from '@/auth';
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
  await signIn('credentials', {
    email: formData.get('email'),
    password: formData.get('password'),
    redirectTo: '/dashboard',
  });
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
