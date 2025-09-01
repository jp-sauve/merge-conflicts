'use client';

import React from 'react';
import Link from 'next/link';
import Header from '../components/header/Header';
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
      <Header session={session} isAdmin={isAdmin} />

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