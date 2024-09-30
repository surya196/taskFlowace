import express from 'express';
import { register } from '../controllers/authController/registerController';
import { login } from '../controllers/authController/loginController';
import {loginValidationRules, validate } from '../validators/authValidator';

const authRoute = express.Router();

authRoute.post('/register',loginValidationRules(), validate, register);
authRoute.post('/login', loginValidationRules(), validate, login);

export default  authRoute;