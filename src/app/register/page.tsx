'use client';

import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signup } from '@/app/actions/auth';

export default function RegisterPage() {
  const router = useRouter();
  const [state, action, pending] = useActionState(signup, undefined);

  useEffect(() => {
    if (state && !state.errors) {
      // Assuming successful signup if state exists and no errors
      router.push('/login?registered=true');
    }
  }, [state, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-900">
          Register
        </h1>
        <>
          <form action={action} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                placeholder="Username"
                className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            {state?.errors?.username && <p>{state.errors.username}</p>}
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            {state?.errors?.email && <p>{state.errors.email}</p>}
            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            {state?.errors?.password && (
              <div>
                <p>Password must:</p>
                <ul>
                  {state.errors.password.map((error) => (
                    <li key={error}>- {error}</li>
                  ))}
                </ul>
              </div>
            )}
            <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </form>
          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <a
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Login here
            </a>
          </p>
        </>
      </div>
    </div>
  );
}
