import {APIGatewayProxyResult} from "aws-lambda";

export class ApiError {
    statusCode: number;
    reason: string;

    constructor(statusCode: number, reason: string) {
        this.reason = reason;
        this.statusCode = statusCode;
    }

    static internalServerError = () => new ApiError(500, 'An unknown error occurred.')
}