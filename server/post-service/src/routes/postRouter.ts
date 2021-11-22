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
});

// retun all the posts feed
postRouter.get('/' , async (req:Request, res: Response) => {
    const posts = dbhelper.getAllPosts();
    res.send(posts);
});

postRouter.post('/',
    async (req: Request, res: Response) => {
        const id: string = uuid();
        const post: Post = {
            postId : id,
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
        title: data.title,
        price: data.price,
        category: data.category,
        condition: data.condition,
        description: data.description
    }

    const createdPost = dbhelper.update(post);
    res.sendStatus(204);
});

postRouter.delete('/:postId', async(req:Request, res: Response) => {
    const { postId } = req.params;
    dbhelper.delete(postId);

    res.sendStatus(204);
});

export const PostRouter: Router = postRouter; 