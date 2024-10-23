import { body, check, query } from 'express-validator';

export const contentValidator = [
    body('title').isString().notEmpty().withMessage('Content title is required'),
    body('body').isString().notEmpty().withMessage('Content body is required'),
];


export const contentDeleteValidator = [
    query('id').notEmpty().withMessage('Content id is required'),
];