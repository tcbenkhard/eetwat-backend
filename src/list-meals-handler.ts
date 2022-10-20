import {mealRepository} from "./repository/meal-repository";
import {APIGatewayProxyEvent, APIGatewayProxyResult, Context} from "aws-lambda";
import {wrapHandler} from "./util/handler-wrapper";

const listMealsHandler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    const meals = await mealRepository.findAll();
    return {
        statusCode: 200,
        body: JSON.stringify(meals),
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }
}

export const handler = wrapHandler(listMealsHandler)