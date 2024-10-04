import express from 'express';
import { personValidationForCreatev1, personValidationForCreatev2, personValidationsForv1, personValidationsForv2 } from '../middlewares/personMiddleware';
import { createPerson } from '../controllers/personController/createPerson';
import { updatePerson } from '../controllers/personController/updatePerson';
import { deletePerson } from '../controllers/personController/deletePerson';
import { getPerson } from '../controllers/personController/getPerson';

const personRoutes = express.Router();

personRoutes.post('/v1/create', personValidationForCreatev1, createPerson);
personRoutes.patch('/v1/update/:id', personValidationsForv1, updatePerson);
personRoutes.get('/v1/get', personValidationsForv1, getPerson);
personRoutes.delete('/v1/delete/:id', personValidationsForv1, deletePerson);

personRoutes.post('/v2/create', personValidationForCreatev2, createPerson);
personRoutes.patch('/v2/update/:id', personValidationsForv2, updatePerson);
personRoutes.get('/v2/get', personValidationsForv2, getPerson);
personRoutes.delete('/v2/delete/:id', personValidationsForv2, deletePerson);

export default personRoutes;