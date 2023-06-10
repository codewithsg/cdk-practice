import { App, CfnOutput, Duration, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { DatabaseInstance, DatabaseInstanceEngine, PostgresEngineVersion } from 'aws-cdk-lib/aws-rds';
import { Bucket, BucketEncryption } from 'aws-cdk-lib/aws-s3';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class CdkPracticeStack extends Stack {

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, {
      ...props,
      env: {
        account: process.env.AWS_ACCESS_KEY_ID,
        region: process.env.AWS_REGION
      }
    });

    /* Creating EC2 Instance */
    // const vpc = new ec2.Vpc(this, 'MyVpc', {
    //   maxAzs:2,
    //   natGateways: 0,
    //   subnetConfiguration: [{
    //     name: 'public',
    //     cidrMask: 24,
    //     subnetType: ec2.SubnetType.PUBLIC,
    //   },{
    //     name:'private',
    //     cidrMask: 24,
    //     subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS
    //   }]
    // });
    // const ec2Instance = new ec2.Instance(this, 'MyInstance', {
    //   vpc,
    //   instanceType: new ec2.InstanceType('t2.micro'),
    //   machineImage: ec2.MachineImage.genericLinux({ 'sa-east-1': ':ami-000001' }),
    //   keyName:'who-create-key'
    // })

    /* Creating RDS instance */
    // const rdsInstance = new DatabaseInstance(this, 'MyRdsInstance', {
    //   vpc,
    //   engine: DatabaseInstanceEngine.postgres({
    //     version: PostgresEngineVersion.VER_15_3
    //   }),
    //   instanceType: ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE2, ec2.InstanceSize.SMALL),
    //   allocatedStorage: 20,
    //   databaseName: 'mydatabase',
    //   credentials: {
    //     username: 'admin'
    //   }
    // });

    /* Create S3 bucket */
    const bucket = new Bucket(this, 'MyBucket', {
      bucketName: 'my-bucket-unique-name',
      removalPolicy: RemovalPolicy.DESTROY,
    })

    /* Outputs */
    // new CfnOutput(this, 'EC2InstanceOutput', { value: ec2Instance.instancePublicIp });
    // new CfnOutput(this, 'RDSEndpointOutput', { value: rdsInstance.dbInstanceEndpointAddress });
    new CfnOutput(this, 'S3Bucket', { value: bucket.bucketName });


    // const myFunction = new lambda.Function(this, 'MyFunction', {
    //   runtime: lambda.Runtime.NODEJS_18_X,
    //   code: lambda.Code.fromInline(`exports.handler = function(event, context) {
    //     console.log("Hello, CDK!");
    //     context.succeed("Hello, CDK!");
    //   };`),
    //   handler: 'index.handler',
    // });

    // // Output the ARN (Amazon Resource Name) of the Lambda function
    // new CfnOutput(this, 'MyFunctionArn', {
    //   value: myFunction.functionArn,
    // });
  }
}
