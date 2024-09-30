import {body,validationResult} from 'express-validator';

export const loginValidationRules = () => {
    return [
        body('email').isEmail().withMessage('Email is required and should be valid'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    ];
};

export const validate = (req: any, res: any, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};