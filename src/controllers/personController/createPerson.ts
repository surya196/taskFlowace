import { Request, Response } from "express";
import { ConflictError } from "../../util/errorUtil";
import { generateId } from "../../util/cryptoUtil";
import { response } from "../../util/responseUtil";
import { IPerson } from "../../types/interfaces/IPerson";
import { validateExistingPersonForCreate } from "../../middlewares/personMiddleware";

export const createPerson = async (req: Request, res: Response) => {
    let connection = req.body.dbConnection;
    const { name, age, gender, address, phone } = req.body;
    try {
        await validateExistingPersonForCreate(connection, phone);
        const id = "PERSON:" + generateId();
        const values = [id, name, age ?? null, gender ?? null, address ?? null, phone];
        const result = await connection.execute(
            'INSERT INTO person (id, name, age, gender, address, phone) VALUES (?, ?, ?, ?, ?, ?)',
            values
        );
        const newPerson: IPerson = { id, name, age, gender, address, phone };
        return response.sendSuccess(res, 'Person created successfully', newPerson);
    } catch (error) {
        console.error('Database error:', error);
        return response.sendError(res, error);
    } finally {
        if (connection) {
            connection.release();
        }
    }
};