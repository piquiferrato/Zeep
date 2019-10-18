import {Request} from 'express';
import schemaAuthorization from './Schemas/AuthorizationSchemas';
import ShowPostCommand from '../Commands/ShowPostCommand';
import AuthorizationService from '../Services/AuthorizationService';
import User from '../../Domain/Entity/User';

class PostShowAdapter{
    public constructor(){

    }

    public async adapt(req: Request): Promise<ShowPostCommand>{
        const {authorization} = req.headers;

        const resultAuthorization = schemaAuthorization.validate(authorization);

        if(resultAuthorization.error){
            throw resultAuthorization.error;
        }

        const authService = new AuthorizationService();
        const user: User = await authService.getUser(resultAuthorization.value);

        return new ShowPostCommand(user);
    }
}

export default PostShowAdapter;
