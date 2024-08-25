import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../utils/db';
import { getSession } from 'next-auth/react';
import mongoose from 'mongoose';
import { UserProgress } from '../../utils/types';

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
                const progressData: UserProgress[] = await mongoose.model('UserProgress').find({ userId }).exec();
                return res.status(200).json(progressData);
            } catch (error) {
                console.error('Error fetching user progress:', error);
                return res.status(500).json({ message: 'Error fetching progress data' });
            }
        
        case 'POST':
            const { date, value } = req.body;

            if (!date || value === undefined) {
                return res.status(400).json({ message: 'Date and value are required' });
            }

            try {
                const newProgress = await mongoose.model('UserProgress').create({ userId, date, value });
                return res.status(201).json(newProgress);
            } catch (error) {
                console.error('Error saving progress:', error);
                return res.status(500).json({ message: 'Error saving progress data' });
            }

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            return res.status(405).end(`Method ${req.method} not allowed`);
    }
};

export default handler;