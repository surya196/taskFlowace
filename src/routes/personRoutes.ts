import express from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';
import { jwtBasedValidation, originBasedValidation, personValidations } from '../middlewares/personMiddleware';
import { createPerson } from '../controllers/personController/createPerson';
import { updatePerson } from '../controllers/personController/updatePerson';
import { deletePerson } from '../controllers/personController/deletePerson';
import { getPerson } from '../controllers/personController/getPerson';

const personRoutes = express.Router();

personRoutes.post('/v1/create', personValidations, createPerson);
personRoutes.patch('/v1/update/:id/:phone', personValidations, updatePerson);
personRoutes.get('/v1/get', authenticateToken, originBasedValidation, getPerson);
personRoutes.delete('/v1/delete/:id', authenticateToken, originBasedValidation, deletePerson);

personRoutes.post('/v2/create', personValidations, createPerson);
personRoutes.patch('/v2/update/:id/:phone', personValidations, updatePerson);
personRoutes.get('/v2/get', authenticateToken, jwtBasedValidation, getPerson);
personRoutes.delete('/v2/delete/:id', authenticateToken, jwtBasedValidation, deletePerson);

export default personRoutes;