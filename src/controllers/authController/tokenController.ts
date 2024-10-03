import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { IUser } from "../../types/interfaces/IUser";
dotenv.config();

export const generateTokens = (user: IUser) => {
    const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || '';
    const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || '';

    const payload = { emil: user.email, tenantId: user.tenantId };
    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    return { accessToken, refreshToken };
}