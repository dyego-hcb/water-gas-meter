// src/services/CustomerServices.ts

import { Customer } from '../models/Customer';
import { ConnDB } from '../db/ConnDB';

// DTOS
import { CreateCustomerDTO } from '../dtos/customer-dto/CreateCustomerDTO';
import { UpdateCustomerDTO } from '../dtos/customer-dto/UpdateCustomerDTO';
import { CustomerResponseDTO } from '../dtos/customer-dto/CustomerResponseDTO';

export class CustomerServices {
    private static customerRepository = ConnDB.getRepository(Customer);

    static async getAllCustomers(): Promise<CustomerResponseDTO[]> {
        const customers = await this.customerRepository.find();
        return customers
            .filter(customer => customer.id !== undefined)
            .map(customer => new CustomerResponseDTO(customer.id as number, customer.customer_code as string));
    }

    static async getCustomerById(id: number): Promise<CustomerResponseDTO | null> {
        const customer = await this.customerRepository.findOneBy({ id });
        if (!customer) return null;
        return new CustomerResponseDTO(customer.id as number, customer.customer_code as string);
    }

    static async getCustomerByCustomerCode(customer_code: string): Promise<CustomerResponseDTO | null> {
        const customer = await this.customerRepository.findOneBy({ customer_code });
        if (!customer) return null;
        return new CustomerResponseDTO(customer.id as number, customer.customer_code as string);
    }

    static async createCustomer(data: CreateCustomerDTO): Promise<CustomerResponseDTO> {
        const customer = this.customerRepository.create(data);
        const savedCustomer = await this.customerRepository.save(customer);
        return new CustomerResponseDTO(savedCustomer.id as number, savedCustomer.customer_code as string);
    }

    static async updateCustomer(id: number, data: UpdateCustomerDTO): Promise<CustomerResponseDTO | null> {
        const customer = await this.getCustomerById(id);
        if (!customer) {
            return null;
        }
        Object.assign(customer, data);
        const updatedCustomer = await this.customerRepository.save(customer);
        return new CustomerResponseDTO(updatedCustomer.id, updatedCustomer.customer_code);
    }

    static async deleteCustomer(id: number): Promise<boolean> {
        const result = await this.customerRepository.delete(id);
        return (result.affected ?? 0) > 0;
    }
}

export default CustomerServices;
