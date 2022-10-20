import {ApiError} from "./api-error";

export const parseOrThrow = (jsonString: string | null) => {
    if(!jsonString) throw ApiError.badRequestError('Missing required request body.');
    try {
        return JSON.parse(jsonString);
    } catch (e) {
        console.error(e);
        throw ApiError.badRequestError('Failed to parse request body.');
    }
}