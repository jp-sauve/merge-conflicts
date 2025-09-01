'use server';

// import { auth } from '@/auth';
import { runQuery } from '@/lib/db';
import { signInSchema } from '@/lib/zod';
import bcrypt from 'bcrypt';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const credentials = {
      username: formData.get('username'),
      password: formData.get('password'),
    };

    const { username, password } = await signInSchema.parseAsync(credentials);

    const users = (await runQuery('SELECT * FROM users WHERE username = ?', [
      username,
    ])) as any[];

    if (users.length > 0) {
      const user = users[0];
      const isValid = await bcrypt.compare(password, user.password_hash);

      if (isValid) {
        return undefined; // Success - no error message
      }
    }

    return 'Invalid credentials.';
  } catch (error) {
    console.error('Authentication error:', error);
    return 'Something went wrong.';
  }
}
