import {Request} from 'express';
import ShowPostCommand from '../Commands/ShowPostCommand';

class PostShowAdapter{
    public constructor(){

    }

    public async adapt(req: Request): Promise<ShowPostCommand>{
        //@ts-ignore
        const userId: number = await req.currentUserId;
        return new ShowPostCommand(userId);
    }
}

export default PostShowAdapter;
