import { mapService } from '@services/index';

import express, { Request, Response, RequestHandler } from 'express';

const router: express.Router = express.Router();

router.get('/polygon', (async (req: Request, res: Response) => {
  const { scale, big, medium, small } = req.query;
  if (scale && (big || medium || small)) {
    const polygon = await mapService.queryPolygon(
      Number(scale),
      big as string,
      medium as string,
      small as string,
    );
    res.json(polygon);
  } else {
    res.json([
      { name: '', path: [], code: '', codeLength: 0, center: [], type: '' },
    ]);
  }
}) as RequestHandler);

router.get('/search', (async (req: Request, res: Response) => {
  const { keyword } = req.query;
  if (typeof keyword === 'string' && keyword.length > 0) {
    const center = await mapService.queryCenter(keyword);
    res.json(center);
  } else {
    res.json([]);
  }
}) as RequestHandler);

export default router;
