#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { createStack } from '../lib/fargate-docker-stack';
import { dockerProperties as dockerPropertiesDev, stackTags as stackTagsDev } from './site-config-dev';
import { dockerProperties as dockerPropertiesProd, stackTags as stackTagsProd } from './site-config-prod';

// Name for the app and prefix for all created resources
const appName = 'AppName';

// Define region and acconunt for the stack
const stackProperties = {
    env: {
        region: 'eu-central-1',
        account: '781382135117',
    }
};

// Use predefined hosted zone and a domain certificate
const getDnsProperties = (certificateIdentifier: string, domainName: string, subdomainName: string) => ({
    domainName: domainName,
    subdomainName: subdomainName,
    domainCertificateArn: `arn:aws:acm:${stackProperties.env.region}:${stackProperties.env.account}:certificate/${certificateIdentifier}`,
});

const app = new cdk.App();

const environment = app.node.tryGetContext('environment');
if (environment === undefined) {
    throw new Error('Environment must be given');
}

const dnsProperties = getDnsProperties(
  app.node.tryGetContext('certificateIdentifier'),
  app.node.tryGetContext('domainName'),
  app.node.tryGetContext('subdomainName'));
const stackName = `${appName}-${environment}`;

const dockerProperties = environment === 'dev' ? dockerPropertiesDev : dockerPropertiesProd;
const stackTags = environment === 'dev' ? stackTagsDev : stackTagsProd;
console.log('create stack');

createStack(app, stackName, dockerProperties, dnsProperties, stackTags, stackProperties);

console.log('synth');

app.synth();
