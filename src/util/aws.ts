import * as AWS from "aws-sdk";

export const dynamo = new AWS.DynamoDB.DocumentClient({region: 'eu-west-1'});