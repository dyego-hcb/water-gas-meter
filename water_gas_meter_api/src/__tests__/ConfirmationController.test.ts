// src/__tests__/ConfirmationController.test.test.ts

import request from 'supertest';
import express from 'express';

// SERVICES
import { ConfirmationServices } from '../services/ConfirmationServices';

// ROUTES
import confirmationRoutes from '../routes/ConfirmationRoutes';

// DTOS
import { ConfirmationResponseDTO } from '../dtos/confirmation-dto/ConfirmationResponseDTO';
import { CreateConfirmationDTO } from '../dtos/confirmation-dto/CreateConfirmationDTO';

const app = express();
app.use(express.json());
app.use('/api/confirmation', confirmationRoutes);

describe('ConfirmationController', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /api/confirmation/get-all', () => {
        it('should return all confirmations', async () => {
            const mockConfirmations: ConfirmationResponseDTO[] = [{ id: 1, confirmed_value: 100, confirmed_at: new Date(), measureId: 1, confirmed: true, created_at: new Date(), updated_at: new Date() }];
            jest.spyOn(ConfirmationServices, 'getAllConfirmation').mockResolvedValue(mockConfirmations);

            const response = await request(app).get('/api/confirmation/get-all');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockConfirmations);
        });

        it('should handle errors', async () => {
            jest.spyOn(ConfirmationServices, 'getAllConfirmation').mockRejectedValue(new Error('Database error'));

            const response = await request(app).get('/api/confirmation/get-all');
            expect(response.status).toBe(500);
            expect(response.text).toBe('Error fetching confirmations');
        });
    });

    describe('GET /api/confirmation/get-by-id/:id', () => {
        it('should return confirmation by ID', async () => {
            const mockConfirmation: ConfirmationResponseDTO = { id: 1, confirmed_value: 100, confirmed_at: new Date(), measureId: 1, confirmed: true, created_at: new Date(), updated_at: new Date() };
            jest.spyOn(ConfirmationServices, 'getConfirmationById').mockResolvedValue(mockConfirmation);

            const response = await request(app).get('/api/confirmation/get-by-id/1');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockConfirmation);
        });

        it('should return 400 for invalid ID', async () => {
            const response = await request(app).get('/api/confirmation/get-by-id/invalid');
            expect(response.status).toBe(400);
            expect(response.text).toBe('Invalid confirmation ID');
        });

        it('should handle errors', async () => {
            jest.spyOn(ConfirmationServices, 'getConfirmationById').mockRejectedValue(new Error('Database error'));

            const response = await request(app).get('/api/confirmation/get-by-id/1');
            expect(response.status).toBe(500);
            expect(response.text).toBe('Error fetching confirmation');
        });
    });

    describe('POST /api/confirmation/register', () => {
        it('should create a new confirmation', async () => {
            const newConfirmation: CreateConfirmationDTO = new CreateConfirmationDTO(100, true, new Date(), 1);
            jest.spyOn(ConfirmationServices, 'createConfirmation').mockResolvedValue(new ConfirmationResponseDTO(1, 100, true, new Date(), 1, new Date(), new Date()));

            const response = await request(app)
                .post('/api/confirmation/register')
                .send({ confirmed_value: 100, confirmed_at: new Date().toISOString(), confirmed: true, measureId: 1 });
            expect(response.status).toBe(201);
            expect(response.body).toEqual(new ConfirmationResponseDTO(1, 100, true, new Date(), 1, new Date(), new Date()));
        });

        it('should return 400 if required fields are missing or invalid', async () => {
            const response = await request(app)
                .post('/api/confirmation/register')
                .send({});
            expect(response.status).toBe(400);
            expect(response.text).toBe('Confirmed value, confirmed at, confirmed status, and measure ID are required');
        });

        it('should handle errors', async () => {
            jest.spyOn(ConfirmationServices, 'createConfirmation').mockRejectedValue(new Error('Database error'));

            const response = await request(app)
                .post('/api/confirmation/register')
                .send({ confirmed_value: 100, confirmed_at: new Date().toISOString(), confirmed: true, measureId: 1 });
            expect(response.status).toBe(500);
            expect(response.text).toBe('Error creating confirmation');
        });
    });


    describe('PUT /api/confirmation/edit/:id', () => {
        it('should update an existing confirmation', async () => {
            const updatedConfirmation: ConfirmationResponseDTO = new ConfirmationResponseDTO(1, 200, true, new Date(), 1, new Date(), new Date());
            jest.spyOn(ConfirmationServices, 'updateConfirmation').mockResolvedValue(updatedConfirmation);

            const response = await request(app)
                .put('/api/confirmation/edit/1')
                .send({ confirmed_value: 200, confirmed_at: new Date().toISOString(), confirmed: true, measureId: 1 });
            expect(response.status).toBe(200);
            expect(response.body).toEqual(updatedConfirmation);
        });

        it('should return 400 for invalid ID', async () => {
            const response = await request(app)
                .put('/api/confirmation/edit/invalid')
                .send({ confirmed_value: 200, confirmed_at: new Date().toISOString(), confirmed: true, measureId: 1 });
            expect(response.status).toBe(400);
            expect(response.text).toBe('Invalid confirmation ID');
        });

        it('should return 400 if required fields are missing or invalid', async () => {
            const response = await request(app)
                .put('/api/confirmation/edit/1')
                .send({});
            expect(response.status).toBe(400);
            expect(response.text).toBe('Confirmed value, confirmed at, confirmed status, and measure ID are required');
        });

        it('should handle errors', async () => {
            jest.spyOn(ConfirmationServices, 'updateConfirmation').mockRejectedValue(new Error('Database error'));

            const response = await request(app)
                .put('/api/confirmation/edit/1')
                .send({ confirmed_value: 200, confirmed_at: new Date().toISOString(), confirmed: true, measureId: 1 });
            expect(response.status).toBe(500);
            expect(response.text).toBe('Error updating confirmation');
        });
    });


    describe('DELETE /api/confirmation/delete/:id', () => {
        it('should delete an existing confirmation', async () => {
            jest.spyOn(ConfirmationServices, 'deleteConfirmation').mockResolvedValue(true);

            const response = await request(app).delete('/api/confirmation/delete/1');
            expect(response.status).toBe(204);
        });

        it('should return 400 for invalid ID', async () => {
            const response = await request(app).delete('/api/confirmation/delete/invalid');
            expect(response.status).toBe(400);
            expect(response.text).toBe('Invalid confirmation ID');
        });

        it('should handle errors', async () => {
            jest.spyOn(ConfirmationServices, 'deleteConfirmation').mockRejectedValue(new Error('Database error'));

            const response = await request(app).delete('/api/confirmation/delete/1');
            expect(response.status).toBe(500);
            expect(response.text).toBe('Error deleting confirmation');
        });
    });

    describe('PATCH /api/confirmation/confirm', () => {
        it('should confirm measure', async () => {
            const data = { measure_uuid: 'sample-uuid', confirmed_value: 150 };
            const confirmationResponse: ConfirmationResponseDTO = new ConfirmationResponseDTO(1, 150, true, new Date(), 1, new Date(), new Date());
            jest.spyOn(ConfirmationServices, 'confirmMeasure').mockResolvedValue(confirmationResponse);

            const response = await request(app)
                .patch('/api/confirmation/confirm')
                .send(data);
            expect(response.status).toBe(200);
            expect(response.body).toEqual(confirmationResponse);
        });

        it('should return 400 if required fields are missing or invalid', async () => {
            const response = await request(app)
                .patch('/api/confirmation/confirm')
                .send({});
            expect(response.status).toBe(400);
            expect(response.text).toBe('Measure UUID and confirmed value are required');
        });

        it('should handle errors', async () => {
            jest.spyOn(ConfirmationServices, 'confirmMeasure').mockRejectedValue(new Error('Database error'));

            const response = await request(app)
                .patch('/api/confirmation/confirm')
                .send({ measure_uuid: 'sample-uuid', confirmed_value: 150 });
            expect(response.status).toBe(500);
            expect(response.text).toBe('Error confirming measure');
        });
    });


});
