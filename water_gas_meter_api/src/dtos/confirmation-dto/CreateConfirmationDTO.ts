// src/dtos/confirmation-dto/CreateConfirmationDTO.ts

export class CreateConfirmationDTO {
    confirmed_value!: number;
    confirmed_at!: Date;
    measureId!: number;

    constructor(confirmed_value: number, confirmed_at: Date, measureId: number) {
        this.confirmed_value = confirmed_value;
        this.confirmed_at = confirmed_at;
        this.measureId = measureId;
    }
}