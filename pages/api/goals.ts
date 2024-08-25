import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../utils/db';
import { getSession } from 'next-auth/react';
import mongoose from 'mongoose';
import { Goal } from '../../utils/types';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });

    if (!session) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const userId = session.user.id;

    await connectToDatabase();

    switch (req.method) {
        case 'GET':
            try {
                const goals = await mongoose.model('Goal').find({ userId }).exec();
                return res.status(200).json(goals);
            } catch (error) {
                console.error('Error fetching goals:', error);
                return res.status(500).json({ message: 'Error fetching goals' });
            }

        case 'POST':
            const { title, details } = req.body;

            if (!title) {
                return res.status(400).json({ message: 'Title is required' });
            }

            try {
                const newGoal = await mongoose.model('Goal').create({ userId, title, details });
                return res.status(201).json(newGoal);
            } catch (error) {
                console.error('Error creating goal:', error);
                return res.status(500).json({ message: 'Error creating goal' });
            }

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            return res.status(405).end(`Method ${req.method} not allowed`);
    }
};

export default handler;