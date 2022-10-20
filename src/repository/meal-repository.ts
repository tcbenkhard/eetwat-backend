import {getEnv} from "../util/get-env";
import {Meal} from "../schema/meal";
import {dynamo} from '../util/aws';

export class MealRepository {
    async findAll(): Promise<Meal[]> {
        const meals = [];
        let exclusiveStartKey = undefined;
        do {
            // @ts-ignore
            const result = await dynamo.scan({
                TableName: getEnv('MEALS_TABLE_NAME'),
                ExclusiveStartKey: exclusiveStartKey
            }).promise();
            exclusiveStartKey = result.LastEvaluatedKey;
            meals.push(...result.Items);
        } while(exclusiveStartKey);

        return meals;
    };

    async save(meal: Meal): Promise<void> {
        await dynamo.put({
            TableName: getEnv('MEALS_TABLE_NAME'),
            Item: meal
        }).promise();
    }
}