import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { generateTokens } from "./tokenController";
import { BadRequestError, UnAuthorizedError } from "../../util/errorUtil";
import { response } from "../../util/responseUtil";
dotenv.config();

export const refreshToken = (req: any, res: any) => {
    const { token } = req.body;
    const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'b7fbdd30-7fec-407c-b6f2-fbb4dc27387b';
    try {
        if (!token) throw new BadRequestError("refersh token cannot be empty");
        
        jwt.verify(token, REFRESH_TOKEN_SECRET, (err: any, user: any) => {
            if (err) throw new UnAuthorizedError("");

            const newTokens = generateTokens(user);
            res.json(newTokens);
        });
    } catch (error) {
        console.log(error);
        response.sendError(res,error);
    }
}