import {MealRepository} from "./repository/meal-repository";
import {APIGatewayProxyEvent, APIGatewayProxyResult, Context} from "aws-lambda";
import {wrapHandler} from "./util/handler-wrapper";
import {Response} from "./util/response";
import {v4 as uuid} from 'uuid';
import {parseOrThrow} from "./util/json";
import {CreateMealRequest, CreateMealRequestSchema} from "./schema/create-meal-request";
import {validateOrThrow} from "./util/validate";

const mealRepository = new MealRepository();

const createMealHandler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    const result = parseOrThrow(event.body) as CreateMealRequest;
    validateOrThrow(CreateMealRequestSchema, result);
    const newMeal = {
        id: uuid(),
        ...result
    }
    await mealRepository.save(newMeal);
    return Response.created(newMeal);
}

export const handler = wrapHandler(createMealHandler)