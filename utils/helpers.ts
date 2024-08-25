import axios from 'axios';

const API_URL = process.env.NEXTAUTH_URL ? `${process.env.NEXTAUTH_URL}/api/` : 'http://localhost:3000/api/';

export const fetchGoals = async (userId: string) => {
    try {
        const response = await axios.get(`${API_URL}goals`, { headers: { 'Authorization': `Bearer ${userId}` } });
        return response.data;
    } catch (error) {
        console.error('Error fetching goals:', error);
        throw new Error('Unable to fetch goals. Please try again later.');
    }
};

export const createGoal = async (goal: string, userId: string) => {
    try {
        const response = await axios.post(`${API_URL}goals`, { title: goal }, { headers: { 'Authorization': `Bearer ${userId}` } });
        return response.data;
    } catch (error) {
        console.error('Error creating goal:', error);
        throw new Error('Unable to create goal. Please try again later.');
    }
};

export const fetchUserProgress = async (userId: string) => {
    try {
        const response = await axios.get(`${API_URL}progress`, { headers: { 'Authorization': `Bearer ${userId}` } });
        return response.data;
    } catch (error) {
        console.error('Error fetching user progress:', error);
        throw new Error('Unable to fetch progress data. Please try again later.');
    }
};

export const addUserProgress = async (date: string, value: number, userId: string) => {
    try {
        const response = await axios.post(`${API_URL}progress`, { date, value }, { headers: { 'Authorization': `Bearer ${userId}` } });
        return response.data;
    } catch (error) {
        console.error('Error adding user progress:', error);
        throw new Error('Unable to add progress data. Please try again later.');
    }
};

export const validateGoal = (goal: string) => {
    if (!goal.trim()) {
        throw new Error('Goal cannot be empty.');
    }
    return true;
};

export const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
};

export const calculateProgressPercentage = (current: number, goal: number): number => {
    if (goal <= 0) return 0;
    return Math.min((current / goal) * 100, 100);
};