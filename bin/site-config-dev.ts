import * as ecs from '@aws-cdk/aws-ecs';
import { ContainerProperties } from '../lib/fargate-docker-stack';

// From where to find and build the docker images
const containerDirectory = './containers';

export const dockerProperties: ContainerProperties[] = [
    {
      image: ecs.ContainerImage.fromAsset(`${containerDirectory}/auth`),
      containerPort: 80,
      id: 'Auth',
      hostHeader: 'auth.link4vetsportal.be',
      environment: { 
        APP_ENVIRONMENT: `env-auth-dev`,
        REACT_APP_AWS_COGNITO_IDENTITY_POOL_ID:"eu-central-1:3ad20eb0-5cf5-4fc2-a5fc-a535801d8140",
        REACT_APP_AWS_COGNITO_REGION:"eu-central-1",
        REACT_APP_AWS_PROJECT_REGION:"eu-central-1",
        REACT_APP_AWS_USER_POOLS_ID:"eu-central-1_9RFaWebkP",
        REACT_APP_AWS_USER_POOLS_WEB_CLIENT_ID:"46fe5t3p73fphf6dm72kkqsv78",
        REACT_APP_AWS_COGNITO_COOKIE_DOMAIN:"link4vetsportal.be",
        REACT_APP_AWS_COGNITO_COOKIE_SECURE:"true",
        REACT_APP_AWS_COGNITO_COOKIE_PATH:"/",
        REACT_APP_AWS_COGNITO_COOKIE_EXPIRES:"7"
      },
    },
    {
      image: ecs.ContainerImage.fromAsset(`${containerDirectory}/landing`),
      containerPort: 80,
      id: 'Landing',
      hostHeader: 'landing.link4vetsportal.be',
      environment: { APP_ENVIRONMENT: `env-landing-dev` },
    },
    {      
      image: ecs.ContainerImage.fromAsset(`${containerDirectory}/landing`),
      containerPort: 80,
      id: 'Sample',
      hostHeader: 'app.link4vetsportal.be',
      environment: { APP_ENVIRONMENT: `env-sample-dev` },
    },
];

export const stackTags: { name: string, value: string }[] = [
    { name: 'Application', value: 'link4vets-portal' },
    { name: 'CostCenter', value: '10001' }, 
    { name: 'WorkOrder', value: 'L4VPROJECT', }
];