import express, { Request, Response } from 'express';

const router: express.Router = express.Router();

router.get('/', function (req: Request, res: Response) {
  res.status(200).json({ title: 'donggle' });
});

export default router;
