'use client';

import React from 'react';
import Link from 'next/link';
// import { useSession, signOut } from 'next-auth/react'; // Uncomment if using next-auth

export default function HomePage() {
  // const { data: session, status } = useSession(); // Uncomment if using next-auth
  // const user = session?.user; // Uncomment if using next-auth
  // const isAdmin = user?.role === 'admin'; // Example admin check

  // Placeholder for session and isAdmin for now
  const session = null; // Replace with actual session data
  const isAdmin = false; // Replace with actual admin check

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">
          <Link href="/">
            <svg width="150" height="30" viewBox="0 0 150 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <text x="0" y="25" font-family="Arial, sans-serif" font-size="24" fill="#2563EB">PairingPro</text>
            </svg>
          </Link>
        </div>

        {/* User Menu */}
        <nav>
          <ul className="flex space-x-4 items-center">
            {session ? (
              <>
                {isAdmin && (
                  <>
                    <li>
                      <Link href="/admin/games" className="text-gray-700 hover:text-blue-600">
                        Admin Games
                      </Link>
                    </li>
                    <li>
                      <Link href="/admin/users" className="text-gray-700 hover:text-blue-600">
                        Admin Users
                      </Link>
                    </li>
                  </>
                )}
                <li>
                  {/* <button onClick={() => signOut()} className="text-gray-700 hover:text-blue-600"> */}
                  <button className="text-gray-700 hover:text-blue-600">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link href="/login" className="text-gray-700 hover:text-blue-600">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-8">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to PairingPro!</h1>
          <p className="text-lg text-gray-600">
            PairingPro is your ultimate platform for collaborative coding challenges and real-time pair programming.
            Connect with other developers, solve complex problems together, and enhance your coding skills in a dynamic and interactive environment.
            Whether you're a beginner looking to learn or an experienced pro seeking new challenges, PairingPro has something for everyone.
          </p>
        </div>
      </main>

      {/* Footer (Optional, but good practice) */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2025 PairingPro. All rights reserved.</p>
      </footer>
    </div>
  );
}