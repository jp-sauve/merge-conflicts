'use client';

import { useFormStatus } from 'react-dom';
import { useActionState } from 'react';
import { authenticate } from '@/app/actions/login';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const [errorMessage, formAction] = useActionState(
    async (prevState: any, formData: FormData) => {
      const error = await authenticate(prevState, formData);
      if (!error) {
        // If no error, trigger client-side sign in
        await signIn('credentials', {
          username: formData.get('username'),
          password: formData.get('password'),
          callbackUrl: '/',
        });
      }
      return error;
    },
    undefined,
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-900">Login</h1>
        <form action={formAction} className="space-y-6">
          <label
            htmlFor="username"
            className="text-sm font-medium text-gray-700"
          >
            Username
            <input
              name="username"
              type="text"
              className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </label>
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Password
            <input
              name="password"
              type="password"
              className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </label>
          {errorMessage && (
            <p className="text-sm text-red-600">{errorMessage}</p>
          )}
          <LoginButton />
        </form>
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a
            href="/register"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      aria-disabled={pending}
    >
      Sign In
    </button>
  );
}
