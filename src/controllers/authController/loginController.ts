export const login = (req: any, res: any) => {
    const { email, password } = req.body;
    // const hashedPassword = hashPassword(password);
  res.status(201).json({ message: 'Login successful' });
    // db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, hashedPassword], (err, results) => {
    //     if (err) {
    //         return res.status(500).json({ error: 'Database error' });
    //     }
    //     if (results.length > 0) {
    //         res.status(200).json({ message: 'Login successful' });
    //     } else {
    //         res.status(401).json({ message: 'Invalid email or password' });
    //     }
    // });
  };

//   export const login = async (req: Request, res: Response) => {
//     const { email, password } = req.body;
//     const hashedPassword = hashPassword(password);

//     try {
//         const [results] = await db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, hashedPassword]);
//         if (results.length > 0) {
//             res.status(200).json({ message: 'Login successful' });
//         } else {
//             res.status(401).json({ message: 'Invalid email or password' });
//         }
//     } catch (err) {
//         res.status(500).json({ error: 'Database error' });
//     }
// };