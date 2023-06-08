import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subs from 'aws-cdk-lib/aws-sns-subscriptions';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import { Construct } from 'constructs';

export class CdkPracticeStack extends Stack {

constructor(scope: Construct, id: string, props ?: StackProps) {
  super(scope, id, {
    ...props,
    env:{
      account: process.env.AWS_ACCESS_KEY_ID,
      region: process.env.AWS_REGION
    }
  });

  const queue = new sqs.Queue(this, 'CdkPracticeQueue', {
    visibilityTimeout: Duration.seconds(300)
  });

  const topic = new sns.Topic(this, 'CdkPracticeTopic');

  topic.addSubscription(new subs.SqsSubscription(queue));
}
}
