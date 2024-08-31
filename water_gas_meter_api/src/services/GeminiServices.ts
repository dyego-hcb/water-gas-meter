// src/services/CustomerServices.ts

import * as dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

// GEMINI
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleAIFileManager } from '@google/generative-ai/server';

// UTILS
import { fileToGenerativePart } from '../utils/GenerativePath';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY as string);

export class GeminiService {
    static async processImage(base64Image: string, fileName: string, imagePath: string) {
        try {

            const prompt = 'Extract the measure value from the image.'

            const generativePart = fileToGenerativePart(imagePath);

            console.log('Uploading file to Google AI FileManager...');
            const uploadResponse = await fileManager.uploadFile(imagePath, {
                mimeType: generativePart.inlineData.mimeType,
                displayName: fileName,
            });

            console.log('Upload response:', uploadResponse);

            if (!uploadResponse?.file?.uri) {
                throw new Error('Failed to upload file: No valid response from upload.');
            }

            const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

            console.log('Generating content with Google AI...');
            const result = await model.generateContent([
                {
                    fileData: {
                        mimeType: uploadResponse.file.mimeType,
                        fileUri: uploadResponse.file.uri
                    }
                },
                { text: prompt },
            ]);
            console.log('Generate content with Google AI:', result.response)

            if (!result?.response?.text) {
                throw new Error('Failed to generate content: No valid response from model.');
            }

            const measureValue = parseFloat(result.response.text());
            if (isNaN(measureValue)) {
                throw new Error('Failed to parse measure value from response.');
            }

            return {
                image_url: uploadResponse.file.uri,
                measure_value: measureValue,
                measure_uuid: uuidv4(),
            };
        } catch (error) {
            console.error('Error processing image:', (error as Error).message);
            throw new Error('Failed to process image with Google Generative AI');
        }
    }
}