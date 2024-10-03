import { Request, Response } from "express";
import { validateForPersonGet } from "../../middlewares/personMiddleware";
import { response } from "../../util/responseUtil";

export const getPerson = async (req: Request, res: Response) => {
    const connection = req.body.dbConnection;
    const { page = 1, limit = 10 } = req.query;

    const pageNumber = parseInt(page as string);
    const limitNumber = parseInt(limit as string);
    validateForPersonGet(pageNumber, limitNumber);

    try {
        const offset = (pageNumber - 1) * limitNumber;
        const [rows] = await connection.execute(`SELECT * FROM person LIMIT ${limitNumber} OFFSET ${offset}`);

        const [countResult] = await connection.execute('SELECT COUNT(*) as total FROM person');
        const total = countResult[0].total;
        const totalPages = Math.ceil(total / limitNumber);

        const result = {
            page: pageNumber,
            limit: limitNumber,
            total,
            totalPages,
            data: rows,
        }
        response.sendSuccess(res, "data", result)
    } catch (error) {
        console.error('Database error:', error);
        return response.sendError(res, error);
    } finally {
        if (connection) {
            connection.release();
        }
    }
}