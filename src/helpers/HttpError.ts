import { IHttpError, HttpErrorStatus } from '../types/index.js';
import CustomHttpError from './CustomHttpError.js';

const messageList = {
  200: 'OK. Successful',
  400: 'Bad request. Invalid request parameters',
  401: 'Authorization required',
  403: 'Not allowed',
  404: 'Not found',
  409: 'Duplicate error',
  420: 'Rate limited',
  500: 'Internal error. Contact support'
};

const HttpError = (
  status: HttpErrorStatus,
  message: string = messageList[status]
): IHttpError => {
  const error = new CustomHttpError(status, message);
  return error;
};

export default HttpError;
