// src/routes/HelloWordRoutes.ts

import express from 'express';
import HelloWordController from '../controllers/HelloWordController';

const router = express.Router();

router.get('/helloword/check-api', HelloWordController.checkAPIConnection);
router.get('/helloword/check-db', HelloWordController.checkDBConnection);

export default router;
