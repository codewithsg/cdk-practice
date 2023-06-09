import { App, CfnOutput, Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export class CdkPracticeStack extends Stack {

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, {
      ...props,
      env: {
        account: process.env.AWS_ACCESS_KEY_ID,
        region: process.env.AWS_REGION
      }
    });

    /* Defining VPC */
    const vpc = new ec2.Vpc(this, 'VPC', {
      maxAzs: 2,
      subnetConfiguration: [
        {
          subnetType: ec2.SubnetType.PUBLIC,
          name: 'PublicSubnet',
        }]
    });

    /* Defining security groups */
    // const securityGroup = new ec2.SecurityGroup(this, 'PracticeInstanceSecurityGroup', {
    //   vpc,
    //   allowAllOutbound: true /* allow all outbound traffic */
    // })
    // /* Setting inboud rules */
    // securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(22), 'Allow SSH access');
    // securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80), 'Allow HTTP access')

    /* Defining EC2 instance */
    const instance = new ec2.Instance(this, 'PracticeInstance', {
      vpc,
      instanceType: new ec2.InstanceType('t2.micro'),
      machineImage: ec2.MachineImage.genericLinux({
        'ap-south-1': 'ami-000001'
      })
    })

    /* Ouput for public IP address of the instance */
    new CfnOutput(this, 'EC2InstancePublicId', {
      value: instance.instancePublicIp
    });
  }
}