// src/utils/ConvertImageToBase64.ts

import * as fs from 'fs';
import * as path from 'path';

export function imageFileToBase64(imagePath: string): string {
    try {
        const imageBuffer = fs.readFileSync(imagePath);

        const base64 = imageBuffer.toString('base64');

        const mimeType = path.extname(imagePath).slice(1);

        return `data:image/${mimeType};base64,${base64}`;
    } catch (error) {
        console.error('Failed to convert image to Base64:', error);
        throw new Error('Failed to convert image to Base64.');
    }
}
