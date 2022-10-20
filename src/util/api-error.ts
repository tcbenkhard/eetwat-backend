import {APIGatewayProxyResult} from "aws-lambda";

export class ApiError {
    statusCode: number;
    reason: string;
    validationErrors?: string[];

    constructor(statusCode: number, reason: string, validationErrors?: string[]) {
        this.reason = reason;
        this.statusCode = statusCode;
        this.validationErrors = validationErrors;
    }

    static internalServerError = () => new ApiError(500, 'An unknown error occurred.')
    static badRequestError = (reason: string, validationErrors?: string[]) => new ApiError(400, reason);
}