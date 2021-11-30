import AWS = require('aws-sdk');
import { Logger } from 'tslog';
import { config } from "./config";


var logger = new Logger();
logger.debug("AWS PROFILE: " + config.aws_profile)
logger.debug("AWS REGION: " + config.aws_region)

AWS.config.accessKeyId = config.aws_key_id
AWS.config.secretAccessKey = config.secret_access_key

export const documentClient = new AWS.DynamoDB.DocumentClient({
    region: config.aws_region
});

