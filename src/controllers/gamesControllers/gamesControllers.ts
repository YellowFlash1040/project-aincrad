import { Request, Response } from 'express';

import { ctrlWrapper } from '../../decorators/index.js';
import { gamesServices } from '../../services/index.js';

const getListOfUpcomingGames = async (_: Request, res: Response) => {
  const result = await gamesServices.getUpcomingGames();
  res.status(200).json(result);
};

export default { getListOfUpcomingGames: ctrlWrapper(getListOfUpcomingGames) };
