import DynamoDB from "aws-sdk/clients/DynamoDB";
import { Post } from "../models/post";
import { config } from "../config"
import { documentClient } from "../aws"

class DynamoDbHelper {    
    docClient: DynamoDB.DocumentClient;
    tableName: string;

    constructor(tableName: string, documentClient: DynamoDB.DocumentClient){
        this.tableName = tableName;
        this.docClient = documentClient;
    }

    async write(post:Post): Promise<Post> {
        await this.docClient.put({
            TableName: this.tableName,
            Item: post
        }).promise()

        return post
    }

    async getPost(postId: string){
        const result = await this.docClient.query({
            TableName: this.tableName,
            KeyConditionExpression: "#postId = :postId",
            ExpressionAttributeNames: {
                "#postId": "postId"
            },
            ExpressionAttributeValues: {
                ":postId": postId
            }
        }).promise()

        return result.Items
    }

    async getAllPosts() {
        const result = await this.docClient.query({
            TableName: this.tableName
        }).promise()

        return result.Items
    }

    async update(post: Post){
        await this.docClient.update({
            TableName: this.tableName,
            Key: {
                'postId': post.postId
            },
            UpdateExpression: 'set #title = :t, price = :p, category = :ctg, condition = :cond, description = :desc', 
            ExpressionAttributeValues: {
                ':t': post.title,
                ':p': post.price,
                ':ctg': post.category,
                ':cond': post.condition,
                ':desc': post.description

            }
        }).promise()

    }

    async delete(postId: string){
        try {
            await this.docClient.delete({
                TableName: this.tableName,
                Key: { postId}
            }).promise()

            console.log('Todo item deleted')
        } catch (error) {
            console.log(error)
        }

    }

}

const dbhelper = new DynamoDbHelper(config.table_name, documentClient);
export default dbhelper