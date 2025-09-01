'use server';

import { SignupFormSchema, FormState } from '@/lib/zod'
import { runQuery } from '@/lib/db';
import bcrypt from 'bcrypt';

export async function signup(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
  })
 
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
  try {
    console.log('Registering user:', validatedFields.data.username);
        const users = await runQuery('SELECT * FROM users', []) as any[];
        const role = users.length === 0 ? 'admin' : 'user';
    const existingUser = await runQuery('SELECT * FROM users WHERE username = ?', [validatedFields.data.username]) as any[];
    if (existingUser.length > 0) {
      return {
        message: 'Username already exists',
      }
    }
    const password_hash = await bcrypt.hash(validatedFields.data.password, 10);
    const id = crypto.randomUUID();
    await runQuery('INSERT INTO users (id, username, email, password_hash, role) VALUES (?, ?, ?, ?, ?)', [id, validatedFields.data.username, validatedFields.data.email, password_hash, role]);
    return {
      message: 'User created successfully',
    }
  } catch (error) {
    return {
      message: 'An error occurred during registration',
    }
  }
}