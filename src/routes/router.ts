import express from 'express';
import loginRoutes from './loginRoutes.js';

const router = express.Router();

router.use('/auth', loginRoutes);

export default router;