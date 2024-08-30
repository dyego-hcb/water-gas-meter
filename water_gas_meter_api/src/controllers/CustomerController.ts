// src/controllers/CustomerController.ts

import { Request, Response } from 'express';

// SERVICES
import { CustomerServices } from '../services/CustomerServices';

// DTOS
import { CreateCustomerDTO } from '../dtos/customer-dto/CreateCustomerDTO';
import { UpdateCustomerDTO } from '../dtos/customer-dto/UpdateCustomerDTO';

class CustomerController {

    static async getAllCustomers(req: Request, res: Response) {
        try {
            const customers = await CustomerServices.getAllCustomers();
            res.status(200).json(customers);
        } catch (err) {
            console.error('Error fetching customers:', err);
            res.status(500).send('Error fetching customers');
        }
    }

    static async getCustomerById(req: Request, res: Response) {
        const { id } = req.params;
        const idNumber = parseInt(id, 10);
        if (isNaN(idNumber)) {
            return res.status(400).send('Invalid customer ID');
        }

        try {
            const customer = await CustomerServices.getCustomerById(idNumber);
            if (customer) {
                res.status(200).json(customer);
            } else {
                res.status(404).send('Customer not found');
            }
        } catch (err) {
            console.error('Error fetching customer:', err);
            res.status(500).send('Error fetching customer');
        }
    }

    static async getCustomerByCustomerCode(req: Request, res: Response) {
        const { customer_code } = req.params;
        if (!customer_code) {
            return res.status(400).send('Customer code is required');
        }

        try {
            const customer = await CustomerServices.getCustomerByCustomerCode(customer_code);
            if (customer) {
                res.status(200).json(customer);
            } else {
                res.status(404).send('Customer not found');
            }
        } catch (err) {
            console.error('Error fetching customer by code:', err);
            res.status(500).send('Error fetching customer');
        }
    }

    static async createCustomer(req: Request, res: Response) {
        const { customer_code } = req.body;

        if (!customer_code || typeof customer_code !== 'string') {
            return res.status(400).send('Customer code is required and must be a string');
        }

        const data = new CreateCustomerDTO(customer_code);
        try {
            const newCustomer = await CustomerServices.createCustomer(data);
            res.status(201).json(newCustomer);
        } catch (err) {
            console.error('Error creating customer:', err);
            res.status(500).send('Error creating customer');
        }
    }

    static async updateCustomer(req: Request, res: Response) {
        const { id } = req.params;
        const idNumber = parseInt(id, 10);

        if (isNaN(idNumber)) {
            return res.status(400).send('Invalid customer ID');
        }

        const { customer_code } = req.body;
        if (!customer_code || typeof customer_code !== 'string') {
            return res.status(400).send('Customer code is required and must be a string');
        }

        const data = new UpdateCustomerDTO(customer_code);
        try {
            const updatedCustomer = await CustomerServices.updateCustomer(idNumber, data);
            if (updatedCustomer) {
                res.status(200).json(updatedCustomer);
            } else {
                res.status(404).send('Customer not found');
            }
        } catch (err) {
            console.error('Error updating customer:', err);
            res.status(500).send('Error updating customer');
        }
    }

    static async deleteCustomer(req: Request, res: Response) {
        const { id } = req.params;
        const idNumber = parseInt(id, 10);
        if (isNaN(idNumber)) {
            return res.status(400).send('Invalid customer ID');
        }

        try {
            const isDeleted = await CustomerServices.deleteCustomer(idNumber);
            if (isDeleted) {
                res.status(200).send('Customer deleted successfully');
            } else {
                res.status(404).send('Customer not found');
            }
        } catch (err) {
            console.error('Error deleting customer:', err);
            res.status(500).send('Error deleting customer');
        }
    }
}

export default CustomerController;
