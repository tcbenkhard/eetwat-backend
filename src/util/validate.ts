import {ObjectSchema} from "jsonschema-definer";
import {ApiError} from "./api-error";

export const validateOrThrow = (schema: ObjectSchema, obj: any): void => {
    const [, error] = schema.validate(obj);
    if(error) throw ApiError.badRequestError('Validation failed', error.map(error => error.message ?? 'No details'));
}