// src/dtos/confirmation-dto/ConfirmationResponseDTO.ts

export class ConfirmationResponseDTO {
    id: number;
    confirmed_value: number;
    confirmed_at: Date;
    measureId: number;
    created_at: Date;
    updated_at: Date;

    constructor(id: number, confirmed_value: number, confirmed_at: Date, measureId: number, created_at: Date, updated_at: Date) {
        this.id = id;
        this.confirmed_value = confirmed_value;
        this.confirmed_at = confirmed_at;
        this.measureId = measureId;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
