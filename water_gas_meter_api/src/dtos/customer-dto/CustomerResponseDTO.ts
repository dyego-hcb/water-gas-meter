// src/dtos/customer-dto/CustomerResponseDTO.ts

export class CustomerResponseDTO {
    id: number;
    customer_code: string;

    constructor(id: number, customer_code: string) {
        this.id = id;
        this.customer_code = customer_code;
    }
}