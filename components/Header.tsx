import React from 'react';
import { useStore } from '../utils/store';
import Link from 'next/link';

const Header: React.FC = () => {
  const { user, setUser } = useStore();

  const handleLogout = () => {
    setUser(null);
    // Additional logout logic can be implemented here if needed
  };

  return (
    <header className="bg-primary text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">
        <Link href="/">Fitness Tracker</Link>
      </h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          {user ? (
            <>
              <li>
                <button onClick={handleLogout} className="hover:underline">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login">Login</Link>
              </li>
              <li>
                <Link href="/signup">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;