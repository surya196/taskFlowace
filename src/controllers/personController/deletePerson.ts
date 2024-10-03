import { Request, Response } from 'express';
import { response } from '../../util/responseUtil';

export const deletePerson = async (req: Request, res: Response) => {
    const connection = req.body.dbConnection;
    const { id } = req.params;

    try {
        await connection.execute('DELETE FROM person WHERE id = ?', [id]);
        return response.sendSuccess(res, 'Person deleted successfully', { id });
    } catch (error) {
        console.error('Database error:', error);
        return response.sendError(res, error);
    } finally {
        if (connection) {
            connection.release();
        }
    }
};
