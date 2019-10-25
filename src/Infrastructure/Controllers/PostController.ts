import { Request, Response } from 'express';
import PostShowAdapter from '../Adapters/PostShowAdapter';
import ShowPostCommand from '../Commands/ShowPostCommand';
import ShowPostsService from '../../Domain/Service/PostShowService';
import "express-async-errors"

class PostController {
    public static async all(req: Request, res: Response) {
        //@ts-ignore
        console.log(await req.currentUserId);
        try {
            const postAdapter = new PostShowAdapter();
            const command: ShowPostCommand = await postAdapter.adapt(req);

            const useCase = new ShowPostsService();
            const posts = await useCase.execute(command);

            res.status(200).send(posts);
        } catch (error) {
            res.status(400).json({ message: error });
        }
    }
}

export default PostController;
