// src/controllers/MeasureController.ts

import { Request, Response } from 'express';

// SERVICES
import { MeasureServices } from '../services/MeasureServices';

// DTOS
import { CreateMeasureDTO } from '../dtos/measure-dto/CreateMeasureDTO';
import { UpdateMeasureDTO } from '../dtos/measure-dto/UpdateMeasureDTO';

class MeasureController {

    static async getAllMeasures(req: Request, res: Response) {
        try {
            const measures = await MeasureServices.getAllMeasures();
            res.status(200).json(measures);
        } catch (err) {
            console.error('Error fetching measures:', err);
            res.status(500).send('Error fetching measures');
        }
    }

    static async getMeasureById(req: Request, res: Response) {
        const { id } = req.params;
        const idNumber = parseInt(id);

        if (isNaN(idNumber)) {
            return res.status(400).send('Invalid ID format');
        }

        try {
            const measure = await MeasureServices.getMeasureById(idNumber);
            if (measure) {
                res.status(200).json(measure);
            } else {
                res.status(404).send('Measure not found');
            }
        } catch (err) {
            console.error('Error fetching measure:', err);
            res.status(500).send('Error fetching measure');
        }
    }

    static async createMeasure(req: Request, res: Response) {
        const data = req.body as CreateMeasureDTO;

        if (!data.customerId) {
            return res.status(400).send('Customer ID is required');
        }

        try {
            const newMeasure = await MeasureServices.createMeasure(data);
            res.status(201).json(newMeasure);
        } catch (err) {
            console.error('Error creating measure:', err);
            res.status(500).send('Error creating measure');
        }
    }

    static async updateMeasure(req: Request, res: Response) {
        const { id } = req.params;
        const idNumber = parseInt(id);
        const data = req.body as UpdateMeasureDTO;

        if (isNaN(idNumber)) {
            return res.status(400).send('Invalid ID format');
        }

        try {
            const updatedMeasure = await MeasureServices.updateMeasure(idNumber, data);
            if (updatedMeasure) {
                res.status(200).json(updatedMeasure);
            } else {
                res.status(404).send('Measure not found');
            }
        } catch (err) {
            console.error('Error updating measure:', err);
            res.status(500).send('Error updating measure');
        }
    }

    static async deleteMeasure(req: Request, res: Response) {
        const { id } = req.params;
        const idNumber = parseInt(id);

        if (isNaN(idNumber)) {
            return res.status(400).send('Invalid ID format');
        }

        try {
            const isDeleted = await MeasureServices.deleteMeasure(idNumber);
            if (isDeleted) {
                res.status(200).send('Measure deleted successfully');
            } else {
                res.status(404).send('Measure not found');
            }
        } catch (err) {
            console.error('Error deleting measure:', err);
            res.status(500).send('Error deleting measure');
        }
    }
}

export default MeasureController;

