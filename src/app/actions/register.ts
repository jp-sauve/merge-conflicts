'use server';

import { signIn } from '@/auth';

export async function registrate(formData: FormData) {
  await signIn('credentials', formData);
}