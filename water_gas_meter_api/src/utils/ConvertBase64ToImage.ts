// src/utils/ConvertBase64ToImage.ts

import * as fs from 'fs';
import * as path from 'path';

export function base64ToImage(base64String: string, fileName: string): Buffer {
    try {
        const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');

        const imageBuffer = Buffer.from(base64Data, 'base64');

        return imageBuffer;
    } catch (error) {
        console.error('Failed to convert Base64 to image buffer:', error);
        throw new Error('Failed to convert Base64 to image buffer.');
    }
}
