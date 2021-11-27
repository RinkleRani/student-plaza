import { Router } from 'express';
import { appendFile } from 'fs';
import { PostRouter } from './routes/postRouter';

const v0Router: Router = Router();

v0Router.use('/post', PostRouter)

export default v0Router;