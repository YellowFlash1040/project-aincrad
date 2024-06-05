import { HttpError } from '../helpers/index.js';

export const checkObjectPresence = (object: any, id: string, modelName = '') => {
  if (!object) {
    throw HttpError(404, `${modelName}${modelName && ' with '}id ${id} wasn't found`);
  }

  return true;
};
