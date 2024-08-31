// src/utils/GenerativePath.ts

import * as fs from 'fs';
import * as path from 'path';
import mime from 'mime-types';

import { imageFileToBase64 } from './ConvertImageToBase64'

export function fileToGenerativePart(filePath: string) {
    try {
        const mimeType = mime.lookup(filePath) || 'application/octet-stream';
        return {
            inlineData: {
                data: imageFileToBase64(filePath),
                mimeType
            },
        };
    }
    catch (error) {
        console.error('Failed to Generative Part image:', error);
        throw new Error('Failed to cGenerative Part image.');
    }
}
