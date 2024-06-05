import { Request, Response, NextFunction } from 'express';
import { CustomHttpError } from '../helpers/index.js';

export const handleNotFound = (req: Request, res: Response, next: NextFunction): void => {
  res.status(404).json({ message: `Route not found for: ${req.path}` });
  return next();
};

export const handleError = (
  error: Error,
  _: Request,
  res: Response,
  next: NextFunction
): void | Response => {
  if (res.headersSent) {
    return next(error);
  }

  if (error instanceof CustomHttpError) {
    const { status, message } = error;
    return res.status(status).json({ message });
  }

  if (process.env.NODE_ENV === 'dev') {
    return res.status(500).json({ message: error.message });
  } else {
    return res.status(500).json({ message: 'Unknown server error' });
  }
};
