// src/dtos/measure-dto/MeasureResponseDTO.ts

export class MeasureResponseDTO {
    id: number;
    measure_uuid!: string;
    measure_datetime!: Date;
    measure_type!: string;
    measure_value!: number;
    image_path!: string;
    image_url!: string;
    customerId!: number;
    confirmationId!: number;
    created_at!: Date;
    updated_at!: Date;

    constructor(
        id: number,
        measure_uuid: string,
        measure_datetime: Date,
        measure_type: string,
        measure_value: number,
        image_path: string,
        image_url: string,
        customerId: number,
        created_at: Date,
        updated_at: Date
    ) {
        this.id = id;
        this.measure_uuid = measure_uuid;
        this.measure_datetime = measure_datetime;
        this.measure_type = measure_type;
        this.measure_value = measure_value;
        this.image_path = image_path;
        this.image_url = image_url;
        this.customerId = customerId;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}