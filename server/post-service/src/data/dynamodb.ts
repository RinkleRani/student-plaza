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
        console.log("table name: " + this.tableName)
        console.log("post id :" + postId)
        const result = await this.docClient.query({
            TableName: this.tableName,
            KeyConditionExpression: "postId = :postId",
            ExpressionAttributeValues: {    
                ":postId": postId
            }
        }).promise()
        console.log(JSON.stringify(result))
        return result.Items
    }

    async getPostFromAccount(accountId: string){
        console.log("table name: " + this.tableName)
        console.log("account id:" + accountId)
        const result = await this.docClient.query({
            TableName: this.tableName,
            KeyConditionExpression: "accountId = :accountId",
            ExpressionAttributeValues:{
                ":accountId": accountId
            }
        }).promise()
        console.log(JSON.stringify(result))
        return result.Items

    }

    async getAllPosts() {
        console.log("In the getAllPosts method......")
        const result = await this.docClient.scan({
            TableName: this.tableName
        }).promise()
        console.log("get all the posts:" + JSON.stringify(result))
        return result.Items
    }

    async update(post: Post){
        await this.docClient.update({
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

    }

    async delete(postId: string){
        try {
            console.log("postid in delete is:" + postId)
            await this.docClient.delete({
                TableName: this.tableName,
                Key: { postId}
            }).promise()

            console.log('Post deleted')
        } catch (error) {
            console.log(error)
        }

    }

}

const dbhelper = new DynamoDbHelper(config.table_name, documentClient);
export default dbhelper