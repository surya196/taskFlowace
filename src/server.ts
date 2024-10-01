import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import router from './routes/router'
import { authenticateToken } from './middlewares/authMiddleware';

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api', router);

app.use('/protected', authenticateToken, (req, res) => {
  res.send('This is a protected route');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});