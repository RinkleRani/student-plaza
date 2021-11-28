import { Router, Request, Response } from 'express';
import { Post } from "../models/post";
import dbhelper from '../data/dynamodb';
import rdsdbhelper from '../data/rdsdb';
import { v4 as uuid } from 'uuid';
import { Logger } from "tslog";
import { AWSError } from 'aws-sdk';

const postRouter: Router = Router();
var logger = new Logger();

// get the posts 
postRouter.get('/', async (req: Request, res: Response) => {
    const auth_userId = req.header('Authorization')
    const postId = req.query.postId
    const userId = req.query.userId
    
    const checkuser = await rdsdbhelper.checkUser(auth_userId)

    if (checkuser == true){
        if (postId == null && userId == null) {
            logger.info("Routing to get all the posts")
            const posts = dbhelper.getAllPosts();
            posts.then((function (data) {
                if (data) {
                    logger.info('Successfully got the posts');
                    res.send(data.Items)
                } else {
                    logger.info('Unable to create the post')
                    res.send({})
                }
            })).catch(function (err: AWSError) {
                logger.error(err.message)
                res.sendStatus(500)   
            });
            
        }
        else if (postId != null && userId == null) {
            if (typeof postId === 'string') {
                logger.info("Routing to get all the linked to userId")
                const post = dbhelper.getPost(postId);
                post.then((function (data) {
                    if (data) {
                        logger.info('Successfully got the post');
                        res.send(data.Items)
                    } else {
                        logger.info('Unable to create the post')
                        res.send({})
                    }
                })).catch(function (err: AWSError) {
                    logger.error(err.message)
                    res.sendStatus(500)  
                });
            }
            else {
                res.sendStatus(400);
            }
        }
        else if (userId != null && postId == null) {
            if (typeof userId === 'string') {
                logger.info("Routing to get the post based on postId")
                const post = dbhelper.getPostFromAccount(userId);
                post.then((function (data) {
                    if (data) {
                        logger.info('Successfully got the post');
                        res.send(data.Items)
                    } else {
                        logger.info('Unable to create the post')
                        res.send({})
                    }
                })).catch(function (err: AWSError) {
                    logger.error(err.message)
                    res.sendStatus(500)  
                });
            }
            else {
                res.sendStatus(400);
            }
        }
    } else{
        logger.info('User does not exists');
        res.sendStatus(401)
    }
});

postRouter.post('/',
    async (req: Request, res: Response) => {
        const id: string = uuid();
        const userId = req.header('Authorization')
        const post: Post = {
            postId: id,
            userId: req.body.userId,
            title: req.body.title,
            price: req.body.price,
            category: req.body.category,
            condition: req.body.condition,
            description: req.body.description
        }

        const checkuser = await rdsdbhelper.checkUser(userId)
        if (checkuser == true){
            const createdPost = dbhelper.write(post)
            createdPost.then((function (data) {
                if (data) {
                    logger.info('Successfully creates the post');
                    res.sendStatus(201)
                } else {
                    logger.info('Unable to create the post')
                    res.sendStatus(400)
                }
            })).catch(function (err: AWSError) {
                logger.error(err.message)
                res.sendStatus(500)  
            });
        } else{
            logger.info('User does not exists');
            res.sendStatus(401)
        }
    });

postRouter.put('/', async (req: Request, res: Response) => {
    const data = req.body;
    const userId = req.header('Authorization')

    const post: Post = {
        postId: data.postId,
        userId: data.userId,
        title: data.title,
        price: data.price,
        category: data.category,
        condition: data.condition,
        description: data.description
    }

    const checkuser = await rdsdbhelper.checkUser(userId)
    if (checkuser == true){
    const createdPost = dbhelper.update(post);
    createdPost.then(function (data) {
        if (!data.Attributes) {
            logger.info('Unable to update the post')
            res.sendStatus(404)
        } else {
            logger.info('Successfully updated the post');
            res.sendStatus(200)
        }
    }).catch(function (err: AWSError) {
        logger.error(err.message)
        res.sendStatus(500)  
    });
    } else{
        logger.info('User does not exists');
        res.sendStatus(401)
    }
});

postRouter.delete('/', async (req: Request, res: Response) => {
    const userId = req.header('Authorization')
    const postId = req.query.postId;
    
    const checkuser = await rdsdbhelper.checkUser(userId)
    if (checkuser == true) {
        if (typeof postId === 'string') {
            logger.info("Routing to delete the post based on given postId")
            const result = dbhelper.delete(postId);
            result.then(function (data) {
                if (!data.Attributes) {
                    logger.info('Unable to delete the post, not found')
                    res.sendStatus(404)
                } else {
                    logger.info('Successfully deleted the post with id: ' + postId);
                    res.sendStatus(204)
                }
            }).catch(function (err: AWSError) {
                logger.error(err.message)
                res.sendStatus(500)  
            });
        } else {
            res.sendStatus(400)
        }
    } else {
        logger.info('User does not exists');
        res.sendStatus(401)
    }
});

export const PostRouter: Router = postRouter;