import { Request, Response } from "express";
import { verifyPassword } from "../../util/cryptoUtil";
import { getConnection } from "../../config/dbConfig";
import { response } from "../../util/responseUtil";
import { BadRequestError, NotFoundError } from "../../util/errorUtil";
import { generateTokens } from "./tokenController";
import { IUser } from "../../types/interfaces/IUser";

export const login = async (req: Request, res: Response) => {
  const { email, password, tenantId } = req.body;
  let connection;

  try {
    connection = await getConnection("userDb");
    console.log("connectiommnnnn")
    const rows = await connection.query("SELECT * FROM login WHERE email = ? AND tenant_id = ?", [email, tenantId]);
    const user: any = rows[0];

    if (user.length == 0) {
      throw new NotFoundError("User not found register first.");
    }

    const isMatch = verifyPassword(password, user[0].password);
    if (!isMatch) {
      throw new BadRequestError("Invalid password.");
    }

    const tokenRequest: IUser = {
      email: user[0].email,
      tenantId: user[0].tenant_id
    }
    const tokens = generateTokens(tokenRequest);

    response.sendSuccess(res, "Login successful", { tokens });
  } catch (error) {
    response.sendError(res, error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};