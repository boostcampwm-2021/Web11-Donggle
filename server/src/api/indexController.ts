import mapController from '@api/mapController';

import express, { Request, Response } from 'express';

const router: express.Router = express.Router();

router.use('/map', mapController);

export default router;
