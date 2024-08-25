import React from 'react';
import Layout from '../components/Layout';
import { useStore } from '../utils/store';
import Link from 'next/link';

const Home: React.FC = () => {
  const { user } = useStore();

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-4xl font-bold mb-4">Welcome to Fitness Tracker</h1>
        <p className="text-lg mb-4">
          A platform to manage your fitness goals and join a community of fitness enthusiasts.
        </p>
        <div className="flex flex-col md:flex-row md:space-x-4">
          {!user ? (
            <>
              <Link href="/login">
                <button className="p-2 bg-primary text-white rounded hover:bg-secondary transition duration-200">
                  Login
                </button>
              </Link>
              <Link href="/signup">
                <button className="p-2 bg-accent text-white rounded hover:bg-secondary transition duration-200">
                  Sign Up
                </button>
              </Link>
            </>
          ) : (
            <Link href="/dashboard">
              <button className="p-2 bg-primary text-white rounded hover:bg-secondary transition duration-200">
                Go to Dashboard
              </button>
            </Link>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Home;