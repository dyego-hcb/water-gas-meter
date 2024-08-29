// src/dtos/customer-dto/UpdateCustomerDTO.ts

export class UpdateCustomerDTO {
    customer_code!: string;

    constructor(customer_code: string) {
        this.customer_code = customer_code;
    }
}