import { Router } from 'express';

import { gamesControllers } from '../../../controllers/index.js';

const router = Router();

router.get('/upcoming', gamesControllers.getListOfUpcomingGames);

export default router;
