import {Request} from 'express';
import schemaAuthorization from './Schemas/AuthorizationSchemas';
import ShowPostCommand from '../Commands/ShowPostCommand';

class PostShowAdapter{
    public constructor(){

    }

    public async adapt(req: Request): Promise<ShowPostCommand>{
        //@ts-ignore
        const userId: number = req.currentUserId;
        return new ShowPostCommand(userId);
    }
}

export default PostShowAdapter;
