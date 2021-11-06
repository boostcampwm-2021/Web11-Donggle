import { queryPolygon } from '@services/map';

import express, { Request, Response, RequestHandler } from 'express';

const router: express.Router = express.Router();

router.get('/polygon', (async (req: Request, res: Response) => {
  const { scale, big, medium, small } = req.query;
  const polygon = await queryPolygon(
    Number(scale),
    big as string,
    medium as string,
    small as string,
  );
  res.json(polygon);
}) as RequestHandler);

export default router;
