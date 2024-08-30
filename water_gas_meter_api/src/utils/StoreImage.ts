// src/utils/StoreImage.ts

import * as fs from 'fs';
import * as path from 'path';

export function saveImage(imageBuffer: Buffer, fileName: string, measureType: string) {
    try {
        var directoryPath = path.join(__dirname, '../assets/images/measure_image/');;

        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true });
        }
        if (measureType == 'WATER') {
            directoryPath = path.join(__dirname, '../assets/images/measure_image/measure_water');
        }
        else if (measureType == 'GAS') {
            directoryPath = path.join(__dirname, '../assets/images/measure_image/measure_gas');
        }

        const filePath = path.join(directoryPath, fileName);

        fs.writeFileSync(filePath, imageBuffer);

        return filePath;
    } catch (error) {
        console.error('Error saving the image:', error);
        throw new Error('Unable to save the image.');
    }
}
