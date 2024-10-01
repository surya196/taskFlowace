import express from 'express';
import { register } from '../controllers/authController/registerController';
import { login } from '../controllers/authController/loginController';
import { loginValidationRules, validate } from '../middlewares/authMiddleware';
import { refreshToken } from '../controllers/authController/refershTokenController';

const loginRoute = express.Router();

loginRoute.post('/register', loginValidationRules(), validate, register);
loginRoute.post('/login', loginValidationRules(), validate, login);
loginRoute.post('/refresh-token', refreshToken);

export default loginRoute;