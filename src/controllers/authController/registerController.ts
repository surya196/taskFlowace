import {hashPassword} from "../../util/cryptoUtil";

export const register = (req: any, res: any) => {
  const { email, password } = req.body;
  const hashedPassword = hashPassword(password);
res.status(201).json({ message: 'User registered successfully' });
  // db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], (err, results) => {
  //     if (err) {
  //         return res.status(500).json({ error: 'Database error' });
  //     }
  //     res.status(201).json({ message: 'User registered successfully' });
  // });
};