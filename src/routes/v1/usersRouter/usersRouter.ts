import { Router, Request, Response } from 'express';

const usersRouter = Router();

usersRouter.get('/', (_: Request, res: Response) => {
  res.status(200).json({ message: 'Works' });
});

export default usersRouter;
