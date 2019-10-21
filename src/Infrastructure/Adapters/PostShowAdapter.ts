import {Request} from 'express';
import schemaAuthorization from './Schemas/AuthorizationSchemas';
import ShowPostCommand from '../Commands/ShowPostCommand';
import AuthorizationService from '../Services/AuthorizationService';
import {IHashService} from "../Services/IHashService";
import {HashService} from "../Services/HashService";

class PostShowAdapter{
    public constructor(){

    }

    public async adapt(req: Request): Promise<ShowPostCommand>{
        const {authorization} = req.headers;

        const resultAuthorization = schemaAuthorization.validate(authorization);

        if(resultAuthorization.error){
            throw resultAuthorization.error;
        }

        const hashService: IHashService = new HashService();
        const authService = new AuthorizationService(hashService);
        const user: number = await authService.getUserId(resultAuthorization.value);

        return new ShowPostCommand(user);
    }
}

export default PostShowAdapter;
