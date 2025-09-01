'use client';

import { useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  role: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch('/api/users');
    if (res.ok) {
      const data = await res.json();
      setUsers(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, role }),
    });

    if (res.ok) {
      fetchUsers();
      setUsername('');
      setPassword('');
      setRole('user');
    } else {
      const data = await res.json();
      setError(data.message || 'An error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin: Users</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Create New User</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Form fields for user creation */}
            <button type="submit">Create User</button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Existing Users</h2>
          <ul className="space-y-4">
            {users.map((user) => (
              <li key={user.id} className="p-4 border border-gray-200 rounded-md">
                <h3 className="text-xl font-bold">{user.username}</h3>
                <p className="text-gray-700">Role: {user.role}</p>
              </li>
            ))}
          </ul>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
}
