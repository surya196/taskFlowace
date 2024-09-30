import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import router from './routes/router'

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api', router);
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});