import { connectToDatabase } from '../db';
import User from '../models/User';
import { validateUserInput } from './validation';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export const registerUser = async (req: NextApiRequest, res: NextApiResponse) => {
    await connectToDatabase();
    
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
};

export const loginUser = async (req: NextApiRequest, res: NextApiResponse) => {
    await connectToDatabase();

    const { email, password } = req.body;
    const { isValid, errors } = validateUserInput(email, password);

    if (!isValid) {
        return res.status(400).json({ message: 'Invalid input.', errors });
    }

    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // Code to create a session token would go here.

        return res.status(200).json({ message: 'Login successful.', user });
    } catch (error) {
        console.error('Error during user login:', error);
        return res.status(500).json({ message: 'Server error during login.' });
    }
};

export const getCurrentUser = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });

    if (!session) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    return res.status(200).json(session.user);
};