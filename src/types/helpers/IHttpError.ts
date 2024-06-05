import HttpErrorStatus from '../data/HttpErrorStatus.js';

interface IHttpError {
  status: HttpErrorStatus;
  message: string;
}

export default IHttpError;
