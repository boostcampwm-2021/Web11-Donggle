import express, { Request, Response } from 'express';

import map from '@api/map';

const router: express.Router = express.Router();

router.use('/map', map);

export default router;
