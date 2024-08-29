export function isValidBase64Image(base64: string): boolean {
    const regex = /^data:image\/(png|jpg|jpeg|gif);base64,/;
    return regex.test(base64);
}