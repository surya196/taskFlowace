import { Request, Response } from "express";
import { response } from "../../util/responseUtil";
import { IPerson } from "../../types/interfaces/IPerson";
import { validateExistingPersonForUpdate } from "../../middlewares/personMiddleware";

export const updatePerson = async (req: Request, res: Response) => {
    const connection = req.body.dbConnection;
    const { id, phoneParms } = req.params;
    const { name, age, gender, address, phone } = req.body;
    console.log(req.params, "parms")
    try {
        await validateExistingPersonForUpdate(connection, Number(phoneParms), id);

        const updates: string[] = [];
        const values: string[] = [];

        if (name !== undefined) {
            updates.push('name = ?');
            values.push(name);
        }
        if (age !== undefined) {
            updates.push('age = ?');
            values.push(age ?? null);
        }
        if (gender !== undefined) {
            updates.push('gender = ?');
            values.push(gender);
        }
        if (address !== undefined) {
            updates.push('address = ?');
            values.push(address);
        }
        if (phone !== undefined) {
            updates.push('phone = ?');
            values.push(phone);
        }
        values.push(id);
        await connection.execute(`UPDATE person SET ${updates.join(', ')} WHERE id = ?`, values);

        const updatedPerson: IPerson = { id, name, age, gender, address, phone };
        response.sendSuccess(res, 'Person updated successfully', updatedPerson);
    } catch (error) {
        console.error('Database error:', error);
        return response.sendError(res, error);
    } finally {
        if (connection) {
            connection.release();
        }
    }
}