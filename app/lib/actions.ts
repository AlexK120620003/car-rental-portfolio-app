'use server';
import prisma from './prisma';
import { signIn } from '@/auth';

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
