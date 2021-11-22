import AWS = require('aws-sdk');
import { config } from "./config";


const credentials = new AWS.SharedIniFileCredentials({profile: config.aws_profile});
AWS.config.credentials = credentials

export const documentClient = new AWS.DynamoDB.DocumentClient({
    region: config.aws_region
});

