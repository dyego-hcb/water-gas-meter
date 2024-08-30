// src/dtos/measure-dto/UploadMesuareDTO.ts

export class UploadMesuareDTO {
    measure_uuid!: string;
    measure_value!: number;
    image_url!: string;
    updated_at?: Date;

    constructor(
        measure_uuid: string,
        measure_value: number,
        image_url: string,
    ) {
        this.measure_uuid = measure_uuid;
        this.measure_value = measure_value;
        this.image_url = image_url;
        this.updated_at = new Date();
    }
}