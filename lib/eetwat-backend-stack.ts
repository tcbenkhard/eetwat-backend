import * as cdk from 'aws-cdk-lib';
import {Construct} from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda-nodejs';
import * as api from 'aws-cdk-lib/aws-apigateway';
import {LambdaIntegration} from 'aws-cdk-lib/aws-apigateway';
import * as dynamo from 'aws-cdk-lib/aws-dynamodb';
import {AttributeType} from 'aws-cdk-lib/aws-dynamodb';
import {aws_ssm} from "aws-cdk-lib";

interface EetwatBackendProps extends cdk.StackProps {
  environment: 'tst'|'prd'
  serviceName: string
}

export class EetwatBackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: EetwatBackendProps) {
    super(scope, id, props);

    const mealsTable = new dynamo.Table(this, `${props.serviceName}-${props.environment}-table`, {
      tableName: `${props.serviceName}-${props.environment}-table`,
      partitionKey: {
        type: AttributeType.STRING,
        name: 'id'
      }
    })

    const environment = {
      MEALS_TABLE_NAME: mealsTable.tableName
    }

    const listMealsHandler = new lambda.NodejsFunction(this, `${props.serviceName}-${props.environment}-list-meals`, {
      handler: 'handler',
      entry: 'src/list-meals-handler.ts',
      functionName: `${props.serviceName}-${props.environment}-list-meals`,
      environment
    })
    mealsTable.grantReadData(listMealsHandler);

    const gateway = new api.RestApi(this, `${props.serviceName}-${props.environment}`, {
      restApiName: `${props.serviceName}-${props.environment}`,
      defaultCorsPreflightOptions: {
        allowOrigins: ['*']
      }
    });

    const gatewayMeals = gateway.root.addResource('meals');
    gatewayMeals.addMethod('GET', new LambdaIntegration(listMealsHandler));

    new aws_ssm.StringParameter(this, `/${props.serviceName}/${props.environment}/hostname`, {
      parameterName: `/${props.serviceName}/${props.environment}/hostname`,
      stringValue: gateway.url
    });
  }
}
