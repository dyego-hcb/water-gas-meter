// src/dtos/customer-dto/UpdateCustomerDTO.ts

export class UpdateCustomerDTO {
    customer_code!: string;
    updated_at?: Date;

    constructor(customer_code: string) {
        this.customer_code = customer_code;
        this.updated_at = new Date();
    }
}