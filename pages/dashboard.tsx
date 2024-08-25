import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useStore } from '../utils/store';
import GoalInput from '../components/GoalInput';
import ProgressChart from '../components/ProgressChart';
import SocialShareButton from '../components/SocialShareButton';
import { fetchUserProgress } from '../utils/api';
import { Goal, UserProgress } from '../utils/types';

const Dashboard: React.FC = () => {
    const { user, goals, setUserProgress } = useStore();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProgress = async () => {
            if (!user) return;

            setLoading(true);
            setError(null);

            try {
                const userProgress: UserProgress[] = await fetchUserProgress(user.id);
                setUserProgress(userProgress);
            } catch (err) {
                console.error('Error fetching user progress:', err);
                setError('Failed to fetch your progress. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProgress();
    }, [user, setUserProgress]);

    return (
        <Layout>
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            <GoalInput />
            {loading && <p>Loading your progress...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && (
                <>
                    <ProgressChart />
                    <SocialShareButton />
                </>
            )}
            <div className="mt-4">
                <h2 className="text-2xl font-semibold">Your Goals</h2>
                <ul className="list-disc pl-5">
                    {goals.length > 0 ? (
                        goals.map((goal: Goal) => (
                            <li key={goal.id} className="mt-2">
                                {goal.title}
                            </li>
                        ))
                    ) : (
                        <li>No goals set yet. Start tracking your fitness journeys!</li>
                    )}
                </ul>
            </div>
        </Layout>
    );
};

export default Dashboard;