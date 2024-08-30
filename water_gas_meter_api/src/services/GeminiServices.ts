// src/services/CustomerServices.ts

import * as dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

// GEMINI
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleAIFileManager } from '@google/generative-ai/server';

// UTILS
import { base64ToImage } from '../utils/ConvertBase64ToImage';
import { saveImage } from '../utils/StoreImage';

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY as string);

export class GeminiService {
    static async processImage(base64Image: string, fileName: string, measure_type: string) {
        try {
            const imageBuffer = base64ToImage(base64Image, fileName);
            const savedFilePath = saveImage(imageBuffer, fileName, measure_type);
            const text = 'Extract the measure value from the image.';

            console.log('Uploading file to Google AI FileManager...');
            console.log(savedFilePath);

            const uploadResponse = await fileManager.uploadFile(savedFilePath, {
                mimeType: 'image/jpeg',
                displayName: fileName,
            });

            console.log('File uploaded successfully:', uploadResponse);

            const model = genAI.getGenerativeModel({
                model: 'gemini-1.5-pro',
            });

            console.log('Generating content with Google AI...');
            const result = await model.generateContent([
                text, base64Image
            ]);

            const measureValue = parseFloat(result.response.text());
            const measureUUID = uuidv4();
            return {
                image_url: uploadResponse.file.uri,
                measure_value: measureValue,
                measure_uuid: measureUUID,
            };
        } catch (error) {
            console.error('Error processing image:', error);
            throw new Error('Failed to process image with Google Generative AI');
        }
    }
}
