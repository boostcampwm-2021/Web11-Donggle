import express, { Request, Response } from 'express';
import { queryPolygon } from '@services/map';

const router: express.Router = express.Router();

router.get('/polygon', async (req: Request, res: Response) => {
  const { scale, big, medium, small } = req.query;
  const polygon = await queryPolygon(
    Number(scale),
    big as string,
    medium as string,
    small as string,
  );
  res.json(polygon);
});

export default router;
