import { Router } from 'express';

import gamesRouter from './gamesRouter/gamesRouter.js';

const apiRouter = Router();

apiRouter.use('/games', gamesRouter);

export default apiRouter;
