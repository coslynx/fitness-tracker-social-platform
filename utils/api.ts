import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../db';
import Goal from '../models/Goal';
import { getSession } from 'next-auth/react';
import { validateGoalInput } from './validation';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connectToDatabase();
    const session = await getSession({ req });

    if (!session) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const userId = session.user.id;

    switch (req.method) {
        case 'GET':
            try {
                const goals = await Goal.find({ userId }).exec();
                return res.status(200).json(goals);
            } catch (error) {
                console.error('Error fetching goals:', error);
                return res.status(500).json({ message: 'Error fetching goals' });
            }

        case 'POST':
            const { title } = req.body;
            const { isValid, errors } = validateGoalInput(title);

            if (!isValid) {
                return res.status(400).json({ message: 'Invalid input.', errors });
            }

            try {
                const newGoal = new Goal({ userId, title });
                await newGoal.save();
                return res.status(201).json(newGoal);
            } catch (error) {
                console.error('Error creating goal:', error);
                return res.status(500).json({ message: 'Error creating goal' });
            }

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default handler;