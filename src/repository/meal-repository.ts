import * as AWS from 'aws-sdk';
import {getEnv} from "../util/get-env";
import {Meal} from "../schema/meal";

const db = new AWS.DynamoDB.DocumentClient({region: 'eu-west-1'});

export const mealRepository = {
    findAll: async (): Promise<Meal[]> => {
        const meals = [];
        let exclusiveStartKey = undefined;
        do {
            // @ts-ignore
            const result = await db.scan({
                TableName: getEnv('MEALS_TABLE_NAME'),
                ExclusiveStartKey: exclusiveStartKey
            }).promise();
            exclusiveStartKey = result.LastEvaluatedKey;
            meals.push(...result.Items);
        } while(exclusiveStartKey);

        return meals;
    }
}