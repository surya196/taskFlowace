import { getConnection } from "../config/dbConfig";
import { TenantType } from "../types/enums/TenantType";
import { BadRequestError, ConflictError, NotFoundError } from "../util/errorUtil";
import { response } from "../util/responseUtil";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { body, validationResult } from "express-validator";
import rateLimit from 'express-rate-limit';
import { authenticateToken } from "./authMiddleware";
dotenv.config();

const originBasedValidation = async (req: any, res: any, next: any) => {
    try {
        const tenantOrigin = req.get('Origin');
        let tenantId;

        if (tenantOrigin.includes(TenantType.TENANT001)) {
            tenantId = TenantType.TENANT001;
        } else if (tenantOrigin.includes(TenantType.TENANT002)) {
            tenantId = TenantType.TENANT002;
        } else if (tenantOrigin.includes(TenantType.TENANT003)) {
            tenantId = TenantType.TENANT003;
        } else if (tenantOrigin.includes(TenantType.TENANT004)) {
            tenantId = TenantType.TENANT004;
        } else if (tenantOrigin.includes(TenantType.TENANT005)) {
            tenantId = TenantType.TENANT005;
        }

        if (!tenantId) {
            throw new NotFoundError('Tenant not identified');
        }

        req.body.dbConnection = await getConnection(tenantId);
        next();
    } catch (error) {
        console.error('Error in middleware:', error);
        return response.sendError(res, error);
    }
};

const jwtBasedValidation = async (req: any, res: any, next: any) => {
    const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'ef3d9dc8-8c75-4ac2-b6dc-9eb9f989b674';

    try {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) {
            return res.status(403).json({ error: 'No token provided' });
        }

        const decoded: any = jwt.verify(token, ACCESS_TOKEN_SECRET);
        const tenantId = decoded?.tenantId;
        req.body.dbConnection = await getConnection(tenantId);
        next();
    } catch (error) {
        console.error('Error in middleware:', error);
        return response.sendError(res, error);
    }
};

const personValidationRules = () => {
    return [
        body('name').isString().withMessage('Name cannot be empty if provided'),
        body('age').optional().isInt({ gt: 0 }).withMessage('Age must be a positive integer if provided'),
        body('gender').optional().isIn(['male', 'female', 'other']).withMessage('Gender must be male, female, or other if provided'),
        body('address').optional().notEmpty().withMessage('Address cannot be empty if provided'),
        body('phone').notEmpty().withMessage('Phone cannot be empty if provided')
    ];
};

const validate = (req: any, res: any, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const limiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 100,
    message: { error: 'Too many requests, please try again later.' },
});

export const validateExistingPersonForCreate = async (connection: any, phone: number) => {
    const [existingRows] = await connection.execute('SELECT * FROM person WHERE phone = ?', [phone]);

    if (existingRows.length > 0) {
        throw new ConflictError(` Phone number ${phone} must be unique`);
    }
}

export const validateExistingPersonForUpdate = async (connection: any, phone: number, id: string) => {
    const [existingRows] = await connection.execute('SELECT * FROM person WHERE phone = ? AND id != ?', [phone, id]);

    if (existingRows.length > 0) {
        throw new ConflictError(` Phone number ${phone} must be unique`);
    }

    await validateExistingPersonForDelete(connection, id);
}

export const validateExistingPersonForDelete = async (connection: any, id: string) => {
    const [rows] = await connection.execute('SELECT * FROM person WHERE id = ?', [id]);
    if (rows.length === 0) {
        throw new NotFoundError("Person not found");
    }
}

export const validateForPersonGet = (pageNumber: number, limitNumber: number) => {
    if (isNaN(pageNumber) || pageNumber <= 0) {
        throw new BadRequestError('Page number must be a positive integer');
    }
    if (isNaN(limitNumber) || limitNumber <= 0) {
        throw new BadRequestError('Limit must be a positive integer');
    }
}

export const personValidationsForv2: any[] = [
    authenticateToken,
    jwtBasedValidation,
    limiter
];

export const personValidationForCreatev2: any[] = [
    authenticateToken,
    jwtBasedValidation,
    personValidationRules(),
    validate,
    limiter
];

export const personValidationsForv1: any[] = [
    authenticateToken,
    originBasedValidation,
    limiter
];

export const personValidationForCreatev1: any[] = [
    authenticateToken,
    originBasedValidation,
    personValidationRules(),
    validate,
    limiter
];