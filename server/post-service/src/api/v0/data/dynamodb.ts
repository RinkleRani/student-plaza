import AWS = require('aws-sdk');
import { Post } from "../models/post";
import { config } from "../../../config"
import { documentClient } from "../../../aws"
import { Logger } from "tslog";
import { PromiseResult } from "aws-sdk/lib/request";
import { AWSError } from "aws-sdk";

class DynamoDbHelper {  
    log: Logger = new Logger();  
    docClient: AWS.DynamoDB.DocumentClient;
    tableName: string;

    constructor(tableName: string, documentClient: AWS.DynamoDB.DocumentClient){
        this.tableName = tableName;
        this.docClient = documentClient;
    }

    async write(post:Post): Promise<PromiseResult<AWS.DynamoDB.DocumentClient.PutItemOutput, AWSError>>{
        this.log.info("Creating a new post")
        let result = await this.docClient.put({
            TableName: this.tableName,
            Item: post
        }).promise()
        this.log.debug("New post created", post)
        return result
    }

    async getPost(postId: string){
        this.log.info("Fetching the post from dynamoDB")
        this.log.info("table name: ", this.tableName)
        this.log.info("post id :", postId)
        const result = await this.docClient.query({
            TableName: this.tableName,
            KeyConditionExpression: "postId = :postId",
            ExpressionAttributeValues: {    
                ":postId": postId
            }
        }).promise()
        this.log.debug("Item:", JSON.stringify(result))
        return result
    }

    async getPostFromAccount(accountId: string){
        this.log.info("table name: ", this.tableName)
        this.log.info("accountId:", accountId)
        const result = await this.docClient.query({
            TableName: this.tableName,
            KeyConditionExpression: "accountId = :accountId",
            ExpressionAttributeValues:{
                ":accountId": accountId
            }
        }).promise()
        console.log(JSON.stringify(result))
        this.log.debug("Item:", result)
        return result

    }

    async getAllPosts() {

        this.log.debug("Fetching all the posts from dynamoDB")
        const result = await this.docClient.scan({
            TableName: this.tableName
        }).promise()
        this.log.debug("Items:",result)
        return result
    }

    async update(post: Post){
        let result = await this.docClient.update({
            TableName: this.tableName,
            Key: {
                'postId': post.postId
            },
            UpdateExpression: 'set title = :t, userId = :u, price = :p, category = :ctg, #cond = :cond, description = :desc', 
            ExpressionAttributeValues: {
                ':t': post.title,
                ':u': post.userId,
                ':p': post.price,
                ':ctg': post.category,
                ':cond': post.condition,
                ':desc': post.description

            },
            ExpressionAttributeNames: {
                "#cond": "condition"
              }
        }).promise()
        return result
    }

    async delete(postId: string): Promise<PromiseResult<AWS.DynamoDB.DocumentClient.DeleteItemOutput, AWSError>> {
        this.log.info("Deleting post with id: " + postId)
        const result = await this.docClient.delete({
            TableName: this.tableName,
            Key: { postId}
        }).promise()

        return result
    }

}

const dbhelper = new DynamoDbHelper(config.table_name, documentClient);
export default dbhelper