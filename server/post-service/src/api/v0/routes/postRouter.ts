import { Router, Request, Response } from 'express';
import { Post } from "../models/post";
import dbhelper from '../data/dynamodb';
import { v4 as uuid } from 'uuid';
//import querystring from 'query-string'

const postRouter: Router = Router();

// retun all the posts
postRouter.get('/' , async (req:Request, res: Response) => {
    console.log("calling all the posts......")
    const postId = req.query.postId
    const accountId = req.query.accountId
    if (postId == null && accountId == null){
        console.log("In router method of get all posts....")
        const posts = await dbhelper.getAllPosts();
        res.send(posts);
    }
    else if (postId != null && accountId == null){
        if (typeof postId === 'string'){
            const post = await dbhelper.getPost(postId);  
            console.log(post)
            res.send(post);
        }
    }
    else if (accountId!= null && postId == null){
        if (typeof accountId === 'string'){
            const post = await dbhelper.getPostFromAccount(accountId);  
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
    res.sendStatus(204);
});

postRouter.delete('/', async(req:Request, res: Response) => {
    console.log("this is delete method in router....")
    const postId = req.query.postId;
    if (typeof postId === 'string'){
        console.log("This is delete inside the router function")
        await dbhelper.delete(postId);
        res.sendStatus(204);
    }
});

export const PostRouter: Router = postRouter; 