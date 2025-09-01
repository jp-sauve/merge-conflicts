'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

interface Game {
  id: string;
  title: string;
  description: string;
  image_url: string;
  status: string;
}

interface User {
  id: string;
  username: string;
  role: string;
}

interface Participant {
  id: string;
  username: string;
  role: string;
}

export default function EditGamePage() {
  const params = useParams();
  const id = params.id as string;

  const [game, setGame] = useState<Game | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [status, setStatus] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedRole, setSelectedRole] = useState('coder');
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetchGame();
      fetchUsers();
    }
  }, [id]);

  const fetchGame = async () => {
    const res = await fetch(`/api/games/${id}`);
    if (res.ok) {
      const data = await res.json();
      setGame(data.game);
      setTitle(data.game.title);
      setDescription(data.game.description);
      setImageUrl(data.game.image_url);
      setStatus(data.game.status);
      setParticipants(data.participants);
    }
  };

  const fetchUsers = async () => {
    const res = await fetch('/api/users');
    if (res.ok) {
      const data = await res.json();
      setUsers(data);
    }
  };

  const handleUpdateGame = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = await fetch(`/api/games/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, image_url: imageUrl, status }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.message || 'An error occurred');
    }
  };

  const handleAddParticipant = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = await fetch(`/api/games/${id}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: selectedUser, role: selectedRole }),
    });

    if (res.ok) {
      fetchGame();
    } else {
      const data = await res.json();
      setError(data.message || 'An error occurred');
    }
  };

  if (!game) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Game: {game.title}</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Game Details</h2>
          <form onSubmit={handleUpdateGame} className="space-y-4">
            {/* Form fields for game details */}
            <button type="submit">Update Game</button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Participants</h2>
          <ul>
            {participants.map(p => <li key={p.id}>{p.username} ({p.role})</li>)}
          </ul>
          <form onSubmit={handleAddParticipant} className="space-y-4 mt-4">
            <select value={selectedUser} onChange={e => setSelectedUser(e.target.value)}>
              <option value="">Select User</option>
              {users.map(u => <option key={u.id} value={u.id}>{u.username}</option>)}
            </select>
            <select value={selectedRole} onChange={e => setSelectedRole(e.target.value)}>
              <option value="coder">Coder</option>
              <option value="player2">Player 2</option>
            </select>
            <button type="submit">Add Participant</button>
          </form>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
}
