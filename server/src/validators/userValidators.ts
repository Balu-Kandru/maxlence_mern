import { body, check, param, query } from 'express-validator';

export const createUserValidator = [
    body('name').isString().notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

    check('profilePicture')
    .custom((value, { req }) => {
        if (!req.file) {
            throw new Error('Profile picture is required');
        }
        return true;
    })
];

export const loginUserValidator = [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
]

export const emailValidator = [
    body('email').isEmail().withMessage('Invalid email format'),
]

export const tokenNPasswordValidator = [
    param('token').exists().withMessage('Token must be provided').isUUID().withMessage('Invalid token format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];


export const operationsValidator = [
    query('actionId').notEmpty().withMessage('Action id is required'),
];