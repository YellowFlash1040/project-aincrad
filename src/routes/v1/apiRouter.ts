import { Router } from 'express';

import usersRouter from './usersRouter/usersRouter.js';

const apiRouter = Router();

apiRouter.use('/users', usersRouter);

export default apiRouter;
