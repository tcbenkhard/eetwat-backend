import {APIGatewayProxyResult} from "aws-lambda";

export class Response implements APIGatewayProxyResult {
    statusCode: number;
    body: string;
    headers: { [p: string]: boolean | number | string } | undefined;

    constructor(statusCode: number, obj: any) {
        this.body = JSON.stringify(obj);
        this.statusCode = statusCode;
        this.headers = {
            'Access-Control-Allow-Origin': '*'
        }
    }

    public addHeader = (key: string, value: string) => {
        this.headers = {
            ...this.headers,
            key: value
        };
    }

    static ok = (body: any) => new Response(200, body)
    static created = (body: any) => new Response(201, body)
}