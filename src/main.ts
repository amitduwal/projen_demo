import { App, CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    // define resources here...
    const bucket = new s3.Bucket(this, 'MyBucket', {
      versioned: true,
    });

    new CfnOutput(this, 'TestBucket', { value: bucket.bucketArn });
  }
}

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

new MyStack(app, 'projen-demo-dev', { env: devEnv });
// new MyStack(app, 'projen_demo-prod', { env: prodEnv });

app.synth();