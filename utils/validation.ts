import { isEmail, isLength, isInt } from 'validator';

export const validateUserInput = (email: string, password: string) => {
    const errors: { [key: string]: string } = {};

    if (!isEmail(email)) {
        errors.email = 'Email is invalid.';
    }

    if (!isLength(password, { min: 6, max: 20 })) {
        errors.password = 'Password must be between 6 and 20 characters.';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};

export const validateGoalInput = (goal: string) => {
    const errors: { [key: string]: string } = {};

    if (!goal.trim()) {
        errors.goal = 'Goal cannot be empty.';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};

export const validateProgressInput = (date: string, value: number) => {
    const errors: { [key: string]: string } = {};

    if (!Date.parse(date)) {
        errors.date = 'Date is invalid.';
    }

    if (!isInt(value.toString(), { min: 0 })) {
        errors.value = 'Value must be a positive integer.';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};