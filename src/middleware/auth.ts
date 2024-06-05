import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';

import { HttpError, verifyToken } from '../helpers/index.js';
import { User } from '../models/index.js';

export const auth = async (req: Request, _: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(HttpError(401, 'Authorization header not found'));
  }

  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer') {
    return next(HttpError(401, 'Bearer not found'));
  }

  try {
    const { id } = verifyToken(token) as JwtPayload;

    const user = await User.findById(id).select('-password');

    if (!user) {
      return next(HttpError(401, 'User not found'));
    }

    if (!user.token) {
      return next(HttpError(401, 'User already signout'));
    }

    if (user.token === token) {
      req.user = user;
      next();
    } else {
      throw HttpError(401, 'Not authorized');
    }
  } catch (error: any) {
    if (error.status) {
      next(HttpError(error.status, error.message));
    } else {
      next(HttpError(500, 'Something went wrong on our site'));
    }
  }
};

export default auth;
