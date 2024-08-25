import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useStore } from '../utils/store';
import Layout from '../components/Layout';
import Button from '../components/Button';

const Login: React.FC = () => {
    const router = useRouter();
    const { setUser } = useStore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });

            if (res?.error) {
                setError(res.error);
            } else {
                setUser({ email });
                router.push('/dashboard');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Login failed, please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="max-w-md mx-auto mt-10 p-5 border rounded shadow">
                <h1 className="text-xl font-bold mb-4">Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="p-2 border border-gray-400 rounded w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="p-2 border border-gray-400 rounded w-full"
                            required
                        />
                    </div>
                    {error && <div className="text-red-500 mb-4">{error}</div>}
                    <Button label="Login" onClick={() => {}} loading={loading} disabled={loading} />
                </form>
                <p className="mt-4">
                    New to Fitness Tracker? <a href="/signup" className="text-blue-500 hover:underline">Create an account</a>
                </p>
            </div>
        </Layout>
    );
};

export default Login;