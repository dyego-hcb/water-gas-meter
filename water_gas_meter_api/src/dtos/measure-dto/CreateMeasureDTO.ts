// src/dtos/measure-dto/CreateMeasureDTO.ts

import { MeasureType } from '../../models/Measure';

export class CreateMeasureDTO {
    measure_datetime!: Date;
    measure_type!: MeasureType;
    measure_value!: number;
    image_url!: string;
    customerId!: number;

    constructor(
        measure_datetime: Date,
        measure_type: MeasureType,
        measure_value: number,
        image_url: string,
        customerId: number,
    ) {
        this.measure_datetime = measure_datetime;
        this.measure_type = measure_type;
        this.measure_value = measure_value;
        this.image_url = image_url;
        this.customerId = customerId;
    }
}