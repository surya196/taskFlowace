import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { IUser } from "../../types/interfaces/IUser";
dotenv.config();

export const generateTokens = (user: IUser) => {
    const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'ef3d9dc8-8c75-4ac2-b6dc-9eb9f989b674';
    const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'b7fbdd30-7fec-407c-b6f2-fbb4dc27387b';

    const payload = { emil: user.email, tenantId: user.tenantId };
    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '2h' });
    const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    return { accessToken, refreshToken };
}