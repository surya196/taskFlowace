import { randomBytes, createHmac } from 'crypto';
import dotenv from 'dotenv';

dotenv.config();
const SECRET = process.env.SECRET || "b833ee8a-f06f-45cb-b0fa-c141e55a8327";

export const generateId = (length = 16) => {
  return randomBytes(length).toString('hex');
};

export const hashPassword = (password: string) => {
  const salt = randomBytes(16).toString('hex');
  const hash = createHmac('sha256', SECRET).update(salt + password).digest('hex');
  return `${salt}:${hash}`;
};

export const verifyPassword = (password: string, hashedPassword: string) => {
  const [salt, originalHash] = hashedPassword.split(':');
  const hash = createHmac('sha256', SECRET).update(salt + password).digest('hex');
  return hash === originalHash;
};