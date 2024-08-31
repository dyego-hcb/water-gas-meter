// src/__tests__/MeasureController.test.ts

import request from 'supertest';
import express from 'express';

// ROUTES
import measureRoutes from '../routes/MeasureRoutes';

// SERVICES
import { MeasureServices } from '../services/MeasureServices';
import { CustomerServices } from '../services/CustomerServices';

// DTOS
import { CustomerResponseDTO } from '../dtos/customer-dto/CustomerResponseDTO';
import { MeasureResponseDTO } from '../dtos/measure-dto/MeasureResponseDTO';
import { CreateMeasureDTO } from '../dtos/measure-dto/CreateMeasureDTO';
import { MeasureType } from '../models/Measure';

const app = express();
app.use(express.json());
app.use('/api/measures', measureRoutes);

describe('MeasureController', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /api/measures/get-all', () => {
        it('should return all measures', async () => {
            const mockMeasures: MeasureResponseDTO[] = [
                {
                    id: 1,
                    measure_uuid: 'uuid1',
                    measure_datetime: new Date('2024-08-30T00:00:00Z'),
                    measure_type: MeasureType.WATER,
                    measure_value: 100,
                    image_path: 'path/to/image',
                    image_url: 'http://example.com/image.jpg',
                    customerId: 1,
                    confirmationId: 1,
                    created_at: new Date(),
                    updated_at: new Date()
                }
            ];

            jest.spyOn(MeasureServices, 'getAllMeasures').mockResolvedValue(mockMeasures);

            const response = await request(app).get('/api/measures/get-all');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockMeasures);
        });

        it('should handle errors', async () => {
            jest.spyOn(MeasureServices, 'getAllMeasures').mockRejectedValue(new Error('Database error'));

            const response = await request(app).get('/api/measures/get-all');
            expect(response.status).toBe(500);
            expect(response.text).toBe('Error fetching measures');
        });
    });

    describe('GET /api/measures/get-by-customer/:customer_code', () => {
        it('should return measures for a specific customer', async () => {
            const mockCustomer: CustomerResponseDTO = {
                id: 1,
                customer_code: 'CUST001'
            };
            const mockMeasures: MeasureResponseDTO[] = [
                {
                    id: 1,
                    measure_uuid: 'uuid1',
                    measure_datetime: new Date('2024-08-30T00:00:00Z'),
                    measure_type: MeasureType.WATER,
                    measure_value: 100,
                    image_path: 'path/to/image',
                    image_url: 'http://example.com/image.jpg',
                    customerId: 1,
                    confirmationId: 1,
                    created_at: new Date(),
                    updated_at: new Date()
                }
            ];

            jest.spyOn(CustomerServices, 'getCustomerByCustomerCode').mockResolvedValue(mockCustomer);
            jest.spyOn(MeasureServices, 'getAllMeasuresByCustomerCode').mockResolvedValue(mockMeasures);

            const response = await request(app).get('/api/measures/get-by-customer/CUST001');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockMeasures);
        });

        it('should return 400 if customer code is not provided', async () => {
            const response = await request(app).get('/api/measures/get-by-customer/');
            expect(response.status).toBe(400);
            expect(response.text).toBe('Customer code is required');
        });

        it('should handle errors', async () => {
            jest.spyOn(CustomerServices, 'getCustomerByCustomerCode').mockRejectedValue(new Error('Database error'));

            const response = await request(app).get('/api/measures/get-by-customer/CUST001');
            expect(response.status).toBe(500);
            expect(response.text).toBe('Error fetching measures by customer');
        });
    });

    describe('GET /api/measures/get-by-id/:id', () => {
        it('should return a measure by ID', async () => {
            const mockMeasure: MeasureResponseDTO = {
                id: 1,
                measure_uuid: 'uuid1',
                measure_datetime: new Date('2024-08-30T00:00:00Z'),
                measure_type: MeasureType.WATER,
                measure_value: 100,
                image_path: 'path/to/image',
                image_url: 'http://example.com/image.jpg',
                customerId: 1,
                confirmationId: 1,
                created_at: new Date(),
                updated_at: new Date()
            };

            jest.spyOn(MeasureServices, 'getMeasureById').mockResolvedValue(mockMeasure);

            const response = await request(app).get('/api/measures/get-by-id/1');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockMeasure);
        });

        it('should return 400 for invalid ID', async () => {
            const response = await request(app).get('/api/measures/get-by-id/invalid');
            expect(response.status).toBe(400);
            expect(response.text).toBe('Invalid measure ID');
        });

        it('should handle errors', async () => {
            jest.spyOn(MeasureServices, 'getMeasureById').mockRejectedValue(new Error('Database error'));

            const response = await request(app).get('/api/measures/get-by-id/1');
            expect(response.status).toBe(500);
            expect(response.text).toBe('Error fetching measure');
        });
    });

    describe('POST /api/measures/create', () => {
        it('should create a new measure', async () => {
            const newMeasure: CreateMeasureDTO = {
                measure_uuid: 'uuid1',
                measure_datetime: new Date('2024-08-30T00:00:00Z'),
                measure_type: MeasureType.WATER,
                measure_value: 100,
                image_path: 'path/to/image',
                image_url: 'http://example.com/image.jpg',
                customerId: 1,
            };

            const response = await request(app)
                .post('/api/measures/create')
                .send({ measure_uuid: 'uuid1', measure_datetime: new Date('2024-08-30T00:00:00Z'), measure_type: MeasureType.WATER, measure_value: 100, image_path: 'path/to/image', image_url: 'http://example.com/image.jpg', customerId: 1 });
            expect(response.status).toBe(201);
            expect(response.body).toEqual(newMeasure);
        });

        it('should return 400 if data is missing or invalid', async () => {
            const response = await request(app)
                .post('/api/measures/create')
                .send({});
            expect(response.status).toBe(400);
            expect(response.text).toBe('Invalid measure data');
        });

        it('should handle errors', async () => {
            jest.spyOn(MeasureServices, 'createMeasure').mockRejectedValue(new Error('Database error'));

            const response = await request(app)
                .post('/api/measures/create')
                .send({ measure_uuid: 'uuid1', measure_datetime: new Date('2024-08-30T00:00:00Z'), measure_type: MeasureType.WATER, measure_value: 100, image_path: 'path/to/image', image_url: 'http://example.com/image.jpg', customerId: 1 });
            expect(response.status).toBe(500);
            expect(response.text).toBe('Error creating measure');
        });
    });

    describe('PUT /api/measures/update/:id', () => {
        it('should update an existing measure', async () => {
            const updatedMeasure: MeasureResponseDTO = {
                id: 1,
                measure_uuid: 'uuid2',
                measure_datetime: new Date('2024-08-31T00:00:00Z'),
                measure_type: MeasureType.WATER,
                measure_value: 200,
                image_path: 'path/to/new_image',
                image_url: 'http://example.com/new_image.jpg',
                customerId: 1,
                confirmationId: 1,
                created_at: new Date(),
                updated_at: new Date()
            };

            jest.spyOn(MeasureServices, 'updateMeasure').mockResolvedValue(updatedMeasure);

            const response = await request(app)
                .put('/api/measures/update/1')
                .send({ measure_uuid: 'uuid2', measure_datetime: new Date('2024-08-31T00:00:00Z'), measure_type: MeasureType.WATER, measure_value: 200, image_path: 'path/to/new_image', image_url: 'http://example.com/new_image.jpg', customerId: 1 });
            expect(response.status).toBe(200);
            expect(response.body).toEqual(updatedMeasure);
        });

        it('should return 400 for invalid ID', async () => {
            const response = await request(app)
                .put('/api/measures/update/invalid')
                .send({ measure_uuid: 'uuid2', measure_datetime: new Date('2024-08-31T00:00:00Z'), measure_type: MeasureType.WATER, measure_value: 200, image_path: 'path/to/new_image', image_url: 'http://example.com/new_image.jpg', customerId: 1 });
            expect(response.status).toBe(400);
            expect(response.text).toBe('Invalid measure ID');
        });

        it('should handle errors', async () => {
            jest.spyOn(MeasureServices, 'updateMeasure').mockRejectedValue(new Error('Database error'));

            const response = await request(app)
                .put('/api/measures/update/1')
                .send({ measure_uuid: 'uuid2', measure_datetime: new Date('2024-08-31T00:00:00Z'), measure_type: MeasureType.WATER, measure_value: 200, image_path: 'path/to/new_image', image_url: 'http://example.com/new_image.jpg', customerId: 1 });
            expect(response.status).toBe(500);
            expect(response.text).toBe('Error updating measure');
        });
    });

    describe('DELETE /api/measures/delete/:id', () => {
        it('should delete a measure', async () => {
            const response = await request(app).delete('/api/measures/delete/1');
            expect(response.status).toBe(200);
            expect(response.text).toBe('Measure deleted successfully');
        });

        it('should return 400 for invalid ID', async () => {
            const response = await request(app).delete('/api/measures/delete/invalid');
            expect(response.status).toBe(400);
            expect(response.text).toBe('Invalid measure ID');
        });

        it('should handle errors', async () => {
            jest.spyOn(MeasureServices, 'deleteMeasure').mockRejectedValue(new Error('Database error'));

            const response = await request(app).delete('/api/measures/delete/1');
            expect(response.status).toBe(500);
            expect(response.text).toBe('Error deleting measure');
        });
    });

});
