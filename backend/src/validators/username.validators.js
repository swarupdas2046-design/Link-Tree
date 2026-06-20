import { body } from 'express-validator';

const reservedUsernames = [
    'admin',
    'api',
    'login',
    'register',
    'auth',
    'dashboard',
    'support',
];

export const usernameValidation = [
    body('username')
        .trim()
        .notEmpty()
        .withMessage('Username is required')
        .bail()
        .isLength({ min: 3, max: 20 })
        .withMessage('Username must be between 3 and 20 characters')
        .bail()
        .matches(/^[a-zA-Z0-9]+$/)
        .withMessage('Username can only contain letters and numbers')
        .bail()
        .toLowerCase()
        .custom((username) => {
            if (reservedUsernames.includes(username)) {
                throw new Error('This username is reserved');
            }

            return true;
        }),
];
