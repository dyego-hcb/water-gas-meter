// src/services/CustomerServices.ts

import { ConnDB } from '../db/ConnDB';

// MODELS
import { Customer } from '../models/Customer';

// DTOS
import { CreateCustomerDTO } from '../dtos/customer-dto/CreateCustomerDTO';
import { UpdateCustomerDTO } from '../dtos/customer-dto/UpdateCustomerDTO';
import { CustomerResponseDTO } from '../dtos/customer-dto/CustomerResponseDTO';

export class CustomerServices {
    private static customerRepository = ConnDB.getRepository(Customer);

    static async getAllCustomers(): Promise<CustomerResponseDTO[]> {
        try {
            const customers = await this.customerRepository.find();
            return customers
                .filter(customer => customer.id !== undefined)
                .map(customer => new CustomerResponseDTO(customer.id as number, customer.customer_code as string));
        } catch (err) {
            console.error('Error fetching all customers:', err);
            throw new Error('Error fetching all customers');
        }
    }

    static async getCustomerById(id: number): Promise<CustomerResponseDTO | null> {
        if (isNaN(id) || id <= 0) {
            throw new Error('Invalid customer ID');
        }

        try {
            const customer = await this.customerRepository.findOneBy({ id });
            if (!customer) return null;
            return new CustomerResponseDTO(customer.id as number, customer.customer_code as string);
        } catch (err) {
            console.error('Error fetching customer by ID:', err);
            throw new Error('Error fetching customer by ID');
        }
    }

    static async getCustomerByCustomerCode(customer_code: string): Promise<CustomerResponseDTO | null> {
        if (!customer_code) {
            throw new Error('Customer code is required');
        }

        try {
            const customer = await this.customerRepository.findOneBy({ customer_code });
            if (!customer) return null;
            return new CustomerResponseDTO(customer.id as number, customer.customer_code as string);
        } catch (err) {
            console.error('Error fetching customer by code:', err);
            throw new Error('Error fetching customer by code');
        }
    }

    static async createCustomer(data: CreateCustomerDTO): Promise<CustomerResponseDTO> {
        if (!data.customer_code) {
            throw new Error('Customer code is required');
        }

        try {
            const existingCustomer = await this.customerRepository.findOneBy({ customer_code: data.customer_code });
            if (existingCustomer) {
                throw new Error('Customer code already exists');
            }

            const customer = this.customerRepository.create(data);
            const savedCustomer = await this.customerRepository.save(customer);
            return new CustomerResponseDTO(savedCustomer.id as number, savedCustomer.customer_code as string);
        } catch (err) {
            console.error('Error creating customer:', err);
            throw new Error('Error creating customer');
        }
    }

    static async updateCustomer(id: number, data: UpdateCustomerDTO): Promise<CustomerResponseDTO | null> {
        if (isNaN(id) || id <= 0) {
            throw new Error('Invalid customer ID');
        }

        if (!data.customer_code) {
            throw new Error('Customer code is required');
        }

        try {
            const customer = await this.getCustomerById(id);
            if (!customer) {
                return null;
            }
            Object.assign(customer, data);
            const updatedCustomer = await this.customerRepository.save(customer);
            return new CustomerResponseDTO(updatedCustomer.id, updatedCustomer.customer_code);
        } catch (err) {
            console.error('Error updating customer:', err);
            throw new Error('Error updating customer');
        }
    }

    static async deleteCustomer(id: number): Promise<boolean> {
        if (isNaN(id) || id <= 0) {
            throw new Error('Invalid customer ID');
        }

        try {
            const result = await this.customerRepository.delete(id);
            return (result.affected ?? 0) > 0;
        } catch (err) {
            console.error('Error deleting customer:', err);
            throw new Error('Error deleting customer');
        }
    }

}

export default CustomerServices;
