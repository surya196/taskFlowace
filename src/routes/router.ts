import express from 'express';
import loginRoutes from './loginRoutes.js';
import personRoutes from './personRoutes.js';

const router = express.Router();

router.use('/auth', loginRoutes);
router.use('/person', personRoutes);

export default router;