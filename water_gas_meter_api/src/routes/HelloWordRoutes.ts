// src/routes/HelloWordRoutes.ts

import express from 'express';
import HelloWordController from '../controllers/HelloWordController';

const router = express.Router();

router.get('/check-api', HelloWordController.checkAPIConnection);
router.get('/check-db', HelloWordController.checkDBConnection);

export default router;
