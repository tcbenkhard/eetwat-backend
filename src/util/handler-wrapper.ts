import {APIGatewayProxyEvent, APIGatewayProxyResult, Context} from "aws-lambda";
import {ApiError} from "./api-error";

export const wrapHandler = (handler: (event: APIGatewayProxyEvent, context: Context) => Promise<APIGatewayProxyResult>) => async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    try {
        console.log('Received request with event', event);
        const result = await handler(event, context);
        console.log('Handler resulted in the following response.', result);
        return result;
    } catch (e) {
        console.error('The following error occurred.', e);
        if(e instanceof ApiError) {
            return {
                statusCode: e.statusCode,
                body: JSON.stringify(e)
            }
        }
        return {
            statusCode: 500,
            body: JSON.stringify(ApiError.internalServerError())
        }
    }
}