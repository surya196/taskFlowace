import { body, validationResult } from 'express-validator';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { BadRequestError, UnAuthorizedError } from '../util/errorUtil';
import { response } from '../util/responseUtil';
dotenv.config();

export const loginValidationRules = () => {
    return [
        body('email').isEmail().withMessage('Email is required and should be valid'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        body('tenantId').isString().withMessage('tenantId cannot be empty')
    ];
};

export const validate = (req: any, res: any, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

export const authenticateToken = (req: any, res: any, next: any) => {
    const token = req.headers['authorization']?.split(' ')[1];
    const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || '';

    try {
        if (!token) throw new BadRequestError("refersh token cannot be empty");

        jwt.verify(token, ACCESS_TOKEN_SECRET, (err: any, user: any) => {
            if (err) throw new UnAuthorizedError("unAuthorized");
            req.body.user = user;
            next();
        });
    } catch (error) {
        console.log(error);
        response.sendError(res, error);
    }
}