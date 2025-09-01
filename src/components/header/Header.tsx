import Link from 'next/link';

interface HeaderProps {
  session: any; // Replace 'any' with actual session type if available
  isAdmin: boolean;
}

export default function Header({ session, isAdmin }: HeaderProps) {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      {/* Logo */}
      <div className="text-2xl font-bold text-blue-600">
        <Link href="/">
          <svg width="150" height="30" viewBox="0 0 150 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <text x="0" y="25" fontFamily="Arial, sans-serif" fontSize="24" fill="#2563EB">PairingPro</text>
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
  );
}
