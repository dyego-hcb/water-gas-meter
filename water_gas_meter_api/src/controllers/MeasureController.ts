// src/controllers/MeasureController.ts

import { Request, Response } from 'express';

// SERVICES
import { MeasureServices } from '../services/MeasureServices';
import { CustomerServices } from '../services/CustomerServices';
import { GeminiService } from '../services/GeminiServices';

// MODELS
import { MeasureType } from '../models/Measure';

// DTOS
import { CreateMeasureDTO } from '../dtos/measure-dto/CreateMeasureDTO';
import { UpdateMeasureDTO } from '../dtos/measure-dto/UpdateMeasureDTO';
import { CreateCustomerDTO } from '../dtos/customer-dto/CreateCustomerDTO';
import { UploadMesuareDTO } from '../dtos/measure-dto/UploadMesuareDTO';

// UTILS
import { isValidDateTime } from '../utils/ValidateDateMeasure';
import { isValidBase64Image } from '../utils/ValidateBase64Image';
import { base64ToImage } from '../utils/ConvertBase64ToImage';
import { saveImage } from '../utils/StoreImage';

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

    static async getAllMeasureByCustomerCode(req: Request, res: Response) {
        const { customer_code } = req.params;

        if (!customer_code) {
            return res.status(400).send('Invalid customer_code');
        }

        try {
            const costumer = await CustomerServices.getCustomerByCustomerCode(customer_code);
            const measures = await MeasureServices.getAllMeasuresByCustomerCode(costumer!.id);
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
        const { measure_uuid, measure_datetime, measure_type, measure_value, image_path, image_url, customerId } = req.body;

        if (!measure_uuid) {
            return res.status(400).send('Invalid measure_uuid');
        }

        if (!measure_datetime || !isValidDateTime(measure_datetime)) {
            return res.status(400).json({
                error_code: 'INVALID_DATA',
                error_description: 'Invalid measure_datetime'
            });
        }

        if (!Object.values(MeasureType).includes(measure_type)) {
            return res.status(400).send('Invalid measure_type');
        }

        if (typeof measure_value !== 'number' || isNaN(measure_value)) {
            return res.status(400).send('Invalid measure_value');
        }

        if (!image_path) {
            return res.status(400).send('Invalid image_path');
        }

        if (!image_url) {
            return res.status(400).send('Invalid image_url');
        }

        if (isNaN(customerId)) {
            return res.status(400).send('Invalid customerId');
        }

        const data = new CreateMeasureDTO(measure_uuid, measure_datetime, measure_type, measure_value, image_path, image_url, customerId);

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

        const { measure_uuid, measure_datetime, measure_type, measure_value, image_path, image_url, customerId } = req.body;

        if (!measure_uuid || isNaN(Date.parse(measure_uuid))) {
            return res.status(400).send('Invalid measure_uuid');
        }

        if (!measure_datetime || !isValidDateTime(measure_datetime)) {
            return res.status(400).json({
                error_code: 'INVALID_DATA',
                error_description: 'Invalid measure_datetime'
            });
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

        const data = new UpdateMeasureDTO(measure_uuid, measure_datetime, measure_type, measure_value, image_path, image_url, customerId);
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

    static async uploadMeasure(req: Request, res: Response) {
        const { measure_datetime, measure_type, imageFile, customer_code } = req.body;

        if (!measure_datetime || !isValidDateTime(measure_datetime)) {
            return res.status(400).json({
                error_code: 'INVALID_DATA',
                error_description: 'Invalid measure_datetime'
            });
        }

        if (!measure_type) {
            return res.status(400).json({
                error_code: 'INVALID_DATA',
                error_description: 'Missing required measure_type'
            });
        }

        if (!Object.values(MeasureType).includes(measure_type)) {
            return res.status(400).json({
                error_code: 'INVALID_DATA',
                error_description: 'Invalid measure_type'
            });
        }

        if (!isValidBase64Image(imageFile)) {
            return res.status(400).json({
                error_code: 'INVALID_DATA',
                error_description: 'Invalid image_base64'
            });
        }

        if (!isValidDateTime(measure_datetime)) {
            return res.status(400).json({
                error_code: 'INVALID_DATA',
                error_description: 'Invalid measure_datetime'
            });
        }

        const existingMeasure = await MeasureServices.findMeasureByMonth(customer_code, measure_type, new Date(measure_datetime));
        if (existingMeasure) {
            return res.status(409).json({
                error_code: 'DOUBLE_REPORT',
                error_description: 'Leitura do mês já realizada'
            });
        }

        try {
            const imageExtension = imageFile.match(/^data:image\/(png|jpeg|jpg|gif);base64,/i);
            const extension = imageExtension[1];
            const imageName = `${customer_code}-${measure_type}.${extension}`;
            const imageBuffer = base64ToImage(imageFile);
            const savedFilePath = saveImage(imageBuffer, imageName, measure_type);

            var customer = await CustomerServices.getCustomerByCustomerCode(customer_code);
            if (!customer) {
                const data = new CreateCustomerDTO(customer_code);
                customer = await CustomerServices.createCustomer(data);
            }

            const geminiResult = await GeminiService.processImage(imageFile, imageName, savedFilePath);

            const data = new CreateMeasureDTO(geminiResult.measure_uuid, measure_datetime, measure_type, geminiResult.measure_value, savedFilePath, geminiResult.image_url, customer.id);

            const newMeasure = await MeasureServices.createMeasure(data);

            const dataUpload = new UploadMesuareDTO(newMeasure.measure_uuid, newMeasure.measure_value, newMeasure.image_url);

            res.status(200).send(dataUpload);
        } catch (error) {
            console.error('Error processing measure:', error);
            res.status(500).json({
                error_code: 'INTERNAL_ERROR',
                error_description: 'Error processing measure'
            });
        }
    }
}

export default MeasureController;

