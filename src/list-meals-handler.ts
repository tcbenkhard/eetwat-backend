import {MealRepository} from "./repository/meal-repository";
import {APIGatewayProxyEvent, APIGatewayProxyResult, Context} from "aws-lambda";
import {wrapHandler} from "./util/handler-wrapper";
import {Response} from "./util/response";

const mealRepository = new MealRepository();

const listMealsHandler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    const meals = await mealRepository.findAll();
    return Response.ok(meals);
}

export const handler = wrapHandler(listMealsHandler)