import { Router, Request, Response } from 'express';
import { Post } from "../models/post";
import dbhelper from '../data/dynamodb';
import { v4 as uuid } from 'uuid';
import { Logger } from "tslog";

const postRouter: Router = Router();
var log = new Logger();

// retun all the posts
postRouter.get('/' , async (req:Request, res: Response) => {
    const postId = req.query.postId
    const userId = req.query.userId
    if (postId == null && userId == null){
        log.info("Routing to get all the posts")
        const posts = await dbhelper.getAllPosts();
        res.send(posts);
    }
    else if (postId != null && userId == null){
        if (typeof postId === 'string'){
            log.info("Routing to get all the linked to userId")
            const post = await dbhelper.getPost(postId);  
            console.log(post)
            res.send(post);
        }
    }
    else if (userId!= null && postId == null){
        if (typeof userId === 'string'){
            log.info("Routing to get the post based on postId")
            const post = await dbhelper.getPostFromAccount(userId);  
            console.log(post)
            res.send(post);
        }
    }
});
 
postRouter.post('/',
    async (req: Request, res: Response) => {
        const id: string = uuid();
        const post: Post = {
            postId : id,
            userId: req.body.userId,
            title: req.body.title,
            price: req.body.price,
            category: req.body.category,
            condition: req.body.condition,
            description: req.body.description
        }
    
        const createdPost = await dbhelper.write(post)
        log.info("Creating a new post")
        res.send(createdPost)
    });

postRouter.put('/', async(req:Request, res: Response) => {
    const data = req.body;

    const post: Post = {
        postId : data.postId,
        userId : data.userId,
        title: data.title,
        price: data.price,
        category: data.category,
        condition: data.condition,
        description: data.description
    }

    const createdPost = await dbhelper.update(post);
    log.info("Updating the post")
    res.sendStatus(204);
});

postRouter.delete('/', async(req:Request, res: Response) => {
    const postId = req.query.postId;
    if (typeof postId === 'string'){
        log.info("Routing to delete the post based on given postId")
        await dbhelper.delete(postId);
        res.sendStatus(204);
    }
});

export const PostRouter: Router = postRouter; 