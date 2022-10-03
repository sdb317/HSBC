import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';

export class Test1Stack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const myFunction = new lambda.Function(this, 'MyFunction', {
      runtime: lambda.Runtime.PYTHON_3_7,
      handler: 'app.lambda_handler',
      code: lambda.Code.fromAsset('./my_function'),
    });

    const lambdaListFunctionsPolicy = new iam.PolicyStatement({ // Create a policy statement
      actions: ['lambda:ListFunctions'],
      resources: ['*'],
    });

    myFunction.role?.attachInlinePolicy( // Add the policy to the unction's role
      new iam.Policy(this, 'list-functions-policy', {
        statements: [lambdaListFunctionsPolicy],
      }),
    );
  }
}
