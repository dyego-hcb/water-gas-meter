// src/controllers/MeasureController.ts

import { Request, Response } from 'express';

// SERVICES
import { MeasureServices } from '../services/MeasureServices';

// MODELS
import { MeasureType } from '../models/Measure';

// DTOS
import { CreateMeasureDTO } from '../dtos/measure-dto/CreateMeasureDTO';
import { UpdateMeasureDTO } from '../dtos/measure-dto/UpdateMeasureDTO';

// UTILS
import { isValidBase64Image } from '../utils/ValidateBase64Image';

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
        const { measure_datetime, measure_type, measure_value, image_url, customerId } = req.body;

        if (!measure_datetime || isNaN(Date.parse(measure_datetime))) {
            return res.status(400).send('Invalid measure_datetime');
        }

        if (!Object.values(MeasureType).includes(measure_type)) {
            return res.status(400).send('Invalid measure_type');
        }

        if (typeof measure_value !== 'number' || isNaN(measure_value)) {
            return res.status(400).send('Invalid measure_value');
        }

        if (!image_url || !/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(image_url)) {
            return res.status(400).send('Invalid image_url');
        }

        if (isNaN(customerId)) {
            return res.status(400).send('Invalid customerId');
        }

        const data = new CreateMeasureDTO(measure_datetime, measure_type, measure_value, image_url, customerId);

        try {
            const newMeasure = await MeasureServices.createMeasure(data);
            res.status(201).json(newMeasure);
        } catch (err) {
            console.error('Error creating measure:', err);
            res.status(500).send('Error creating measure');
        }
    }

    static async updateMeasure(req: Request, res: Response) {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).send('Invalid measure ID');
        }

        const { measure_datetime, measure_type, measure_value, image_url, customerId } = req.body;

        if (!measure_datetime || isNaN(Date.parse(measure_datetime))) {
            return res.status(400).send('Invalid measure_datetime');
        }

        if (!Object.values(MeasureType).includes(measure_type)) {
            return res.status(400).send('Invalid measure_type');
        }

        if (typeof measure_value !== 'number' || isNaN(measure_value)) {
            return res.status(400).send('Invalid measure_value');
        }

        if (!image_url || !/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(image_url)) {
            return res.status(400).send('Invalid image_url');
        }

        if (isNaN(customerId)) {
            return res.status(400).send('Invalid customerId');
        }

        const data = new UpdateMeasureDTO(measure_datetime, measure_type, measure_value, image_url, customerId);
        try {
            const updatedMeasure = await MeasureServices.updateMeasure(id, data);
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

