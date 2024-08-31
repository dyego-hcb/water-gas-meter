// src/dtos/measure-dto/CreateMeasureDTO.ts

import { MeasureType } from '../../models/Measure';

export class CreateMeasureDTO {
    measure_uuid!: string;
    measure_datetime!: Date;
    measure_type!: MeasureType;
    measure_value!: number;
    image_path!: string;
    image_url!: string;
    customerId!: number;

    constructor(
        measure_uuid: string,
        measure_datetime: Date,
        measure_type: MeasureType,
        measure_value: number,
        image_path: string,
        image_url: string,
        customerId: number,
    ) {
        this.measure_uuid = measure_uuid;
        this.measure_datetime = measure_datetime;
        this.measure_type = measure_type;
        this.measure_value = measure_value;
        this.image_path = image_path;
        this.image_url = image_url;
        this.customerId = customerId;
    }
}