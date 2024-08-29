// src/dtos/customer-dto/CreateCustomerDTO.ts

export class CreateCustomerDTO {
    customer_code: string;

    constructor(customer_code: string) {
        this.customer_code = customer_code;
    }
}