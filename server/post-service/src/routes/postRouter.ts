import { Router, Request, Response } from 'express';
import { Post } from "../models/post";
import dbhelper from '../data/dynamodb';
import { v4 as uuid } from 'uuid';

const postRouter: Router = Router();

// return the post corresponding to given postId
postRouter.get('/:postId', async (req:Request, res: Response) => {
    const {postId} = req.params;
    const post = dbhelper.getPost(postId);
    res.send(post);
})

// retun all the posts feed
postRouter.get('/' , async (req:Request, res: Response) => {
    const posts = dbhelper.getAllPosts();
    res.send(posts);
})

//create a new post
postRouter.post('/', async (req:Request, res: Response) => {
    const data = req.body;
    const id: string = uuid();

    const post: Post = {
        postId : id,
        title: data.title,
        price: data.price,
        category: data.category,
        condition: data.condition,
        description: data.description
    }

    const createdPost = dbhelper.write(post)
    res.send(createdPost)
})

postRouter.put('/', async(req:Request, res: Response) => {
    const data = req.body;

    const post: Post = {
        postId : data.postId,
        title: data.title,
        price: data.price,
        category: data.category,
        condition: data.condition,
        description: data.description
    }

    const createdPost = dbhelper.update(post);
    res.sendStatus(204);
})

postRouter.delete('/:postId', async(req:Request, res: Response) => {
    const { postId } = req.params;
    dbhelper.delete(postId);

    res.sendStatus(204);
})

export const PostRouter: Router = postRouter; 