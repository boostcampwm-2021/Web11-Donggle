import populateMap from '@services/updateMap';

import express, { Request, Response } from 'express';

const router: express.Router = express.Router();

router.post('/map-data/:password', (req: Request, res: Response) => {
  if (req.params.password === process.env.ADMIN_PASSWORD) {
    void populateMap();
    res.status(200).send('HAHA!');
  } else {
    res.status(404).send('DAMN! 404 NOT FOUND... YOU MAD?');
  }
});

export default router;
