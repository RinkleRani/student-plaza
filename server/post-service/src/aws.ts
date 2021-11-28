import AWS = require('aws-sdk');
import { Logger } from 'tslog';
import { config } from "./config";

var logger = new Logger();

const credentials = new AWS.SharedIniFileCredentials({profile: config.aws_profile});
AWS.config.credentials = credentials
logger.debug("AWS CREDENTAILS: " + credentials)
logger.debug("AWS PROFILE: " + config.aws_profile)
logger.debug("AWS REGION: " + config.aws_region)

export const documentClient = new AWS.DynamoDB.DocumentClient({
    region: config.aws_region
});

