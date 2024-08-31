// src/__tests__/CustomerController.test.ts

import request from 'supertest';
import express from 'express';
import customerRoutes from '../routes/CustomerRoutes';
import { CustomerServices } from '../services/CustomerServices';

const app = express();
app.use(express.json());
app.use('/api/customer', customerRoutes);

describe('CustomerController', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /api/customer/get-all', () => {
        it('should return all customers', async () => {
            const mockCustomers = [{ id: 1, customer_code: 'CUST001' }];
            jest.spyOn(CustomerServices, 'getAllCustomers').mockResolvedValue(mockCustomers);

            const response = await request(app).get('/api/customer/get-all');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockCustomers);
        });

        it('should handle errors', async () => {
            jest.spyOn(CustomerServices, 'getAllCustomers').mockRejectedValue(new Error('Database error'));

            const response = await request(app).get('/api/customer/get-all');
            expect(response.status).toBe(500);
            expect(response.text).toBe('Error fetching customers');
        });
    });

    describe('GET /api/customer/get-by-id/:id', () => {
        it('should return customer by ID', async () => {
            const mockCustomer = { id: 1, customer_code: 'CUST001' };
            jest.spyOn(CustomerServices, 'getCustomerById').mockResolvedValue(mockCustomer);

            const response = await request(app).get('/api/customer/get-by-id/1');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockCustomer);
        });

        it('should return 400 for invalid ID', async () => {
            const response = await request(app).get('/api/customer/get-by-id/invalid');
            expect(response.status).toBe(400);
            expect(response.text).toBe('Invalid customer ID');
        });

        it('should handle errors', async () => {
            jest.spyOn(CustomerServices, 'getCustomerById').mockRejectedValue(new Error('Database error'));

            const response = await request(app).get('/api/customer/get-by-id/1');
            expect(response.status).toBe(500);
            expect(response.text).toBe('Error fetching customer');
        });
    });

    describe('GET /api/customer/get-by-customer-code/:customer_code', () => {
        it('should return customer by customer code', async () => {
            const mockCustomer = { id: 1, customer_code: 'CUST001' };
            jest.spyOn(CustomerServices, 'getCustomerByCustomerCode').mockResolvedValue(mockCustomer);

            const response = await request(app).get('/api/customer/get-by-customer-code/CUST001');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockCustomer);
        });

        it('should return 400 if customer code is not provided', async () => {
            const response = await request(app).get('/api/customer/get-by-customer-code/');
            expect(response.status).toBe(400);
            expect(response.text).toBe('Customer code is required');
        });

        it('should handle errors', async () => {
            jest.spyOn(CustomerServices, 'getCustomerByCustomerCode').mockRejectedValue(new Error('Database error'));

            const response = await request(app).get('/api/customer/get-by-customer-code/CUST001');
            expect(response.status).toBe(500);
            expect(response.text).toBe('Error fetching customer by code');
        });
    });

    describe('POST /api/customer/register', () => {
        it('should create a new customer', async () => {
            const newCustomer = { id: 1, customer_code: 'CUST001' };
            jest.spyOn(CustomerServices, 'createCustomer').mockResolvedValue(newCustomer);

            const response = await request(app)
                .post('/api/customer/register')
                .send({ customer_code: 'CUST001' });
            expect(response.status).toBe(201);
            expect(response.body).toEqual(newCustomer);
        });

        it('should return 400 if customer code is missing or invalid', async () => {
            const response = await request(app)
                .post('/api/customer/register')
                .send({});
            expect(response.status).toBe(400);
            expect(response.text).toBe('Customer code is required and must be a string');
        });

        it('should handle errors', async () => {
            jest.spyOn(CustomerServices, 'createCustomer').mockRejectedValue(new Error('Database error'));

            const response = await request(app)
                .post('/api/customer/register')
                .send({ customer_code: 'CUST001' });
            expect(response.status).toBe(500);
            expect(response.text).toBe('Error creating customer');
        });
    });

    describe('PUT /api/customer/edit/:id', () => {
        it('should update an existing customer', async () => {
            const updatedCustomer = { id: 1, customer_code: 'CUST002' };
            jest.spyOn(CustomerServices, 'updateCustomer').mockResolvedValue(updatedCustomer);

            const response = await request(app)
                .put('/api/customer/edit/1')
                .send({ customer_code: 'CUST002' });
            expect(response.status).toBe(200);
            expect(response.body).toEqual(updatedCustomer);
        });

        it('should return 400 for invalid ID', async () => {
            const response = await request(app)
                .put('/api/customer/edit/invalid')
                .send({ customer_code: 'CUST002' });
            expect(response.status).toBe(400);
            expect(response.text).toBe('Invalid customer ID');
        });

        it('should return 400 if customer code is missing or invalid', async () => {
            const response = await request(app)
                .put('/api/customer/edit/1')
                .send({});
            expect(response.status).toBe(400);
            expect(response.text).toBe('Customer code is required and must be a string');
        });

        it('should handle errors', async () => {
            jest.spyOn(CustomerServices, 'updateCustomer').mockRejectedValue(new Error('Database error'));

            const response = await request(app)
                .put('/api/customer/edit/1')
                .send({ customer_code: 'CUST002' });
            expect(response.status).toBe(500);
            expect(response.text).toBe('Error updating customer');
        });
    });

    describe('DELETE /api/customer/delete/:id', () => {
        it('should delete an existing customer', async () => {
            jest.spyOn(CustomerServices, 'deleteCustomer').mockResolvedValue(true);

            const response = await request(app).delete('/api/customer/delete/1');
            expect(response.status).toBe(200);
            expect(response.text).toBe('Customer deleted successfully');
        });

        it('should return 400 for invalid ID', async () => {
            const response = await request(app).delete('/api/customer/delete/invalid');
            expect(response.status).toBe(400);
            expect(response.text).toBe('Invalid customer ID');
        });

        it('should handle errors', async () => {
            jest.spyOn(CustomerServices, 'deleteCustomer').mockRejectedValue(new Error('Database error'));

            const response = await request(app).delete('/api/customer/delete/1');
            expect(response.status).toBe(500);
            expect(response.text).toBe('Error deleting customer');
        });
    });

});
