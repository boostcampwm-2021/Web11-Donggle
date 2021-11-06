import map from '@api/map';

import express, { Request, Response } from 'express';

const router: express.Router = express.Router();

router.use('/map', map);

export default router;
