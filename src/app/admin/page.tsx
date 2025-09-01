import Link from 'next/link';

export default function AdminIndexPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <p className="text-lg mb-8">Welcome to the admin dashboard. Here you can manage various aspects of the application.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3">
            <Link href="/admin/users" className="text-blue-600 hover:underline">
              Manage Users
            </Link>
          </h2>
          <p className="text-gray-700">View, create, update, and delete user accounts.</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3">
            <Link href="/admin/games" className="text-blue-600 hover:underline">
              Manage Games
            </Link>
          </h2>
          <p className="text-gray-700">Administer game data, including game details and settings.</p>
        </div>
      </div>
    </div>
  );
}
