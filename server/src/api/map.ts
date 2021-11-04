import express, { Request, Response } from 'express';
import { parseCode, queryPolygon } from '@services/map';

const router: express.Router = express.Router();

router.get('/polygon', async (req: Request, res: Response) => {
  const { scale, code } = req.query;
  const polygon = await queryPolygon(Number(scale), parseCode(code as string));
  res.json(polygon);
});

export default router;
