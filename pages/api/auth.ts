import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import connectToDatabase from '../../utils/db';
import User from '../../utils/models/User';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connectToDatabase();

    const session = await getSession({ req });

    if (req.method === 'POST') {
        // Sign Up
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(409).json({ message: 'User already exists' });
            }

            const newUser = new User({ email, password });
            await newUser.save();

            return res.status(201).json({ message: 'User created successfully' });
        } catch (error) {
            console.error('Error during user creation:', error);
            return res.status(500).json({ message: 'Error creating user' });
        }
    } else if (req.method === 'GET') {
        // Login
        if (!session) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        return res.status(200).json({ message: 'User is logged in', session });
    } else {
        res.setHeader('Allow', ['POST', 'GET']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default handler;