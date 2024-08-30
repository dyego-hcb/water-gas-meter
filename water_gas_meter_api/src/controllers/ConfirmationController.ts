// src/controllers/ConfirmationController.ts

import { Request, Response } from 'express';

// SERVICES
import { ConfirmationServices } from '../services/ConfirmationServices';
import { MeasureServices } from '../services/MeasureServices';

// DTOS
import { CreateConfirmationDTO } from '../dtos/confirmation-dto/CreateConfirmationDTO';
import { UpdateConfirmationDTO } from '../dtos/confirmation-dto/UpdateConfirmationDTO';
import { UpdateMeasureDTO } from '../dtos/measure-dto/UpdateMeasureDTO';

class ConfirmationController {
    static async getAllConfirmation(req: Request, res: Response) {
        try {
            const confirmations = await ConfirmationServices.getAllConfirmation();
            res.status(200).json(confirmations);
        } catch (err) {
            console.error('Error retrieving confirmations:', err);
            res.status(500).send('Error retrieving confirmations');
        }
    }

    static async getConfirmationById(req: Request, res: Response) {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).send('Invalid confirmation ID');
        }

        try {
            const confirmation = await ConfirmationServices.getConfirmationById(id);
            if (confirmation) {
                res.status(200).json(confirmation);
            } else {
                res.status(404).send('Confirmation not found');
            }
        } catch (err) {
            console.error('Error retrieving confirmation:', err);
            res.status(500).send('Error retrieving confirmation');
        }
    }

    static async createConfirmation(req: Request, res: Response) {
        const { confirmed_value, confirmed_at, measureId } = req.body;

        if (typeof confirmed_value !== 'number' || isNaN(confirmed_value)) {
            return res.status(400).send('Invalid confirmed_value');
        }

        if (!confirmed_at || isNaN(Date.parse(confirmed_at))) {
            return res.status(400).send('Invalid confirmed_at');
        }

        if (isNaN(measureId)) {
            return res.status(400).send('Invalid measureId');
        }

        const data = new CreateConfirmationDTO(confirmed_value, false, confirmed_at, measureId);
        try {
            const confirmation = await ConfirmationServices.createConfirmation(data);
            res.status(201).json(confirmation);
        } catch (err) {
            console.error('Error creating confirmation:', err);
            res.status(500).send('Error creating confirmation');
        }
    }

    static async updateConfirmation(req: Request, res: Response) {
        const id = parseInt(req.params.id, 10);

        if (isNaN(id)) {
            return res.status(400).send('Invalid confirmation ID');
        }

        const { confirmed_value, confirmed, confirmed_at, measureId } = req.body;

        if (typeof confirmed_value !== 'number' || isNaN(confirmed_value)) {
            return res.status(400).send('Invalid confirmed_value');
        }

        if (!confirmed_at || isNaN(Date.parse(confirmed_at))) {
            return res.status(400).send('Invalid confirmed_at');
        }

        if (isNaN(measureId)) {
            return res.status(400).send('Invalid measureId');
        }

        const data = new UpdateConfirmationDTO(id, confirmed_value, confirmed, confirmed_at, measureId);
        try {
            const updatedConfirmation = await ConfirmationServices.updateConfirmation(id, data);
            if (updatedConfirmation) {
                res.status(200).json(updatedConfirmation);
            } else {
                res.status(404).send('Confirmation not found');
            }
        } catch (err) {
            console.error('Error updating confirmation:', err);
            res.status(500).send('Error updating confirmation');
        }
    }

    static async deleteConfirmation(req: Request, res: Response) {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).send('Invalid confirmation ID');
        }

        try {
            await ConfirmationServices.deleteConfirmation(id);
            res.status(204).send();
        } catch (err) {
            console.error('Error deleting confirmation:', err);
            res.status(500).send('Error deleting confirmation');
        }
    }

    static async confirmMeasure(req: Request, res: Response) {

        const { measure_uuid, confirmed_value } = req.body;

        if (typeof confirmed_value !== 'number' || isNaN(confirmed_value)) {
            return res.status(400).send('Invalid confirmed_value');
        }

        if (!measure_uuid) {
            return res.status(400).send('Invalid measure_uuid');
        }

        try {
            const measure = await MeasureServices.getMeasureByMeasureUUID(measure_uuid);

            if (!measure) {
                return res.status(404).send('Measure not found');
            }

            const confirmation = await ConfirmationServices.getConfirmationByMeasureId(measure.id);

            const data = new UpdateConfirmationDTO(confirmation!.id, confirmed_value, true, new Date(), measure.id);

            const confirmedMeasure = await ConfirmationServices.confirmMeasure(confirmation!.id, data);

            if (confirmedMeasure) {
                res.status(200).json(confirmedMeasure.confirmed);
            } else {
                res.status(404).send('Confirmation not found');
            }
        } catch (err) {
            console.error('Error updating confirmation:', err);
            res.status(500).send('Error updating confirmation');
        }
    }
}

export default ConfirmationController;
