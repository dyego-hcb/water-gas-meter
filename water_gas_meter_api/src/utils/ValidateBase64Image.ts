// src/utils/ValidateBase64Image.ts

export function isValidBase64Image(base64: string): boolean {
    const regex = /^data:image\/(png|webp|jpeg|heic|heif);base64,/;
    return regex.test(base64);
}