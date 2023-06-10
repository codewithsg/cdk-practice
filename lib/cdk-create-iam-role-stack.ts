import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";

export class CdkCreateIAMRole extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope,id,{
            ...props,
            env: {
                account: process.env.AWS_ACCESS_KEY_ID,
                region: process.env.AWS_REGION
            }
        })
    }
}