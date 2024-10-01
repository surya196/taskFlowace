import { hashPassword, generateId } from "../../util/cryptoUtil";
import { getConnection } from "../../config/dbConfig";
import { ConflictError } from "../../util/errorUtil";
import { response } from "../../util/responseUtil";
import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  const { email, password, tenantId } = req.body;
  let connection;

  try {
    connection = await getConnection();
    await validateUser(email, tenantId, connection);

    const hashedPassword = hashPassword(password);
    const id = "USER:" + generateId();

    const rows = await connection.execute(
      "INSERT INTO login (id, email, password, tenant_id) VALUES (?, ?, ?, ?)",
      [id, email, hashedPassword, tenantId]
    );

    const result: any = rows[0];
    return response.sendCreated(res, "User registered successfully", { id, email, tenantId });
  } catch (error) {
    console.log(error)
    return response.sendError(res, error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const validateUser = async (email: string, tenantId: string, connection: any) => {
  const [rows] = await connection.query("SELECT * FROM login WHERE email = ? AND tenant_id = ?", [
    email, tenantId
  ]);
  if (rows.length > 0) {
    throw new ConflictError(`Email ${email} already registered try new email`);
  }
};