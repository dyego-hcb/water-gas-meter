// src/routes/MeasureRoutes.ts

import express from 'express';
import MeasureController from '../controllers/MeasureController';

const router = express.Router();

router.get('/get-all', MeasureController.getAllMeasures);
router.get('/get-by-id/:id', MeasureController.getMeasureById);
router.post('/register', MeasureController.createMeasure);
router.put('/edit/:id', MeasureController.updateMeasure);
router.delete('/delete/:id', MeasureController.deleteMeasure);

export default router;
