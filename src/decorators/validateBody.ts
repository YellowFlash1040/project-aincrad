import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

import { HttpError } from '../helpers/index.js';

const validateBody = (schema: ObjectSchema) => {
  const func = (req: Request, _: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};

export default validateBody;
