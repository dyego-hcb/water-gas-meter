// src/dtos/measure-dto/UpdateMeasureDTO.ts

import { MeasureType } from '../../models/Measure';

export class UpdateMeasureDTO {
    measure_datetime!: Date;
    measure_type!: MeasureType;
    measure_value!: number;
    image_url!: string;
    customerId!: number;
    confirmationId!: number;
}