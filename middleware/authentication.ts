import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import connectToDatabase from '../../utils/db';
import User from '../../utils/models/User';
import { validateUserInput } from '../../utils/validation';

// Middleware to handle authentication
const authenticationMiddleware = async (req: NextApiRequest, res: NextApiResponse) => {
    await connectToDatabase();
    
    const session = await getSession({ req });

    if (!session) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    switch (req.method) {
        case 'POST':
            const { email, password } = req.body;
            const { isValid, errors } = validateUserInput(email, password);

            if (!isValid) {
                return res.status(400).json({ message: 'Invalid input.', errors });
            }
            
            try {
                const existingUser = await User.findOne({ email });
                if (existingUser) {
                    return res.status(409).json({ message: 'User already exists.' });
                }

                const newUser = new User({ email, password });
                await newUser.save();

                return res.status(201).json({ message: 'User created successfully.' });
            } catch (error) {
                console.error('Error during user registration:', error);
                return res.status(500).json({ message: 'Server error during registration.' });
            }

        case 'GET':
            return res.status(200).json({ message: 'User is logged in', session });

        default:
            res.setHeader('Allow', ['POST', 'GET']);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default authenticationMiddleware;