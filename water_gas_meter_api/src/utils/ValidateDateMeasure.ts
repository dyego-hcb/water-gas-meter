// src/utils/ValidateDateMeasure.ts

export function isValidDateTime(dateTimeString: string): boolean {
    const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;

    if (!regex.test(dateTimeString)) {
        return false;
    }

    const date = new Date(dateTimeString);

    if (isNaN(date.getTime())) {
        return false;
    }

    const [year, month, day, hour, minute, second] = dateTimeString
        .replace('Z', '')
        .split(/[-T:]/)
        .map(Number);

    return date.getUTCFullYear() === year &&
        date.getUTCMonth() + 1 === month &&
        date.getUTCDate() === day &&
        date.getUTCHours() === hour &&
        date.getUTCMinutes() === minute &&
        date.getUTCSeconds() === second;
}
