import jwt from 'jsonwebtoken';

import { Id } from '../types/index.js';
import { HttpError } from '../helpers/index.js';

const { JWT_SECRET = 'skdavbksjbdavlksbjdvkjsdbv' } = process.env;

export const generateToken = (id: Id) => {
  const payload = { id };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '12h' });

  return token;
};

export const verifyToken = (token: string) => {
  try {
    const data = jwt.verify(token, JWT_SECRET);
    return data;
  } catch (error) {
    throw HttpError(401);
  }
};

export default {
  generateToken,
  verifyToken
};
