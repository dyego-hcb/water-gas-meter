// src/routes/ConfirmationRoutes.ts

import express from 'express';
import ConfirmationController from '../controllers/ConfirmationController';

const router = express.Router();

router.get('/get-all', ConfirmationController.getAllConfirmation);
router.get('/get-by-id/:id', ConfirmationController.getConfirmationById);
router.post('/register', ConfirmationController.createConfirmation);
router.put('/edit/:id', ConfirmationController.updateConfirmation);
router.delete('/delete/:id', ConfirmationController.deleteConfirmation);
router.patch('/confirm', ConfirmationController.confirmMeasure);

export default router;
