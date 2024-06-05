import { isValidObjectId } from 'mongoose';

import { HttpError } from '../helpers/index.js';

export const checkIdValidity = (id: string, modelName = '') => {
  if (!isValidObjectId(id)) {
    throw HttpError(400, `${modelName} id ${id} is not a valid ObjectId`);
  }

  return true;
};
