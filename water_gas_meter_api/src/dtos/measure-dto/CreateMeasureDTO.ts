// src/dtos/measure-dto/CreateMeasureDTO.ts

import { MeasureType } from '../../models/Measure';

export class CreateMeasureDTO {
    measure_datetime!: Date;
    measure_type!: MeasureType;
    measure_value!: number;
    image_url!: string;
    customerId!: number;
}