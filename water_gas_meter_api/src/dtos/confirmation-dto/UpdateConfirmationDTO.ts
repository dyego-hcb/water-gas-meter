// src/dtos/confirmation-dto/UpdateConfirmationDTO.ts

export class UpdateConfirmationDTO {
    confirmed_value!: number;
    confirmed!: boolean;
    confirmed_at!: Date;
    measureId!: number;
    updated_at?: Date;

    constructor(confirmed_value: number, confirmed: boolean, confirmed_at: Date, measureId: number) {
        this.confirmed_value = confirmed_value;
        this.confirmed = confirmed;
        this.confirmed_at = confirmed_at;
        this.measureId = measureId;
        this.updated_at = new Date();
    }
}