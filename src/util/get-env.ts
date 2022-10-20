import {ApiError} from "./api-error";

export const getEnv = (key: string, defaultValue?: string): string => {
    const actualValue = process.env[key];
    if(!actualValue && !defaultValue) {
        console.error(`Missing environment variable '${key}' with no default value set.`)
        throw ApiError.internalServerError();
    }
    return actualValue! ?? defaultValue!;
}