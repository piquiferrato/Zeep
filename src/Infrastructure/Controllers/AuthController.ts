import {Request, Response} from 'express';
import User from '../Entity/User';
import { getRepository } from "typeorm";
import AuthenticateUseCase from '../UseCases/AuthenticateUseCase';
import GenerateAccessTokenUseCase from '../UseCases/GenerateAccessTokenUseCase';
import Session from '../Entity/Session';

export class AuthController{

    public static async login(req: Request, res: Response) {

        const {name, password} = req.body;

        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail({ where: { name : name } });
        } catch (error) {
            res.status(401).send();
        }
        
        try{
            if (AuthenticateUseCase.excecute(user, password)){
                let session = new Session();
                session.accesToken = GenerateAccessTokenUseCase.excecute();
                session.user = user;
                session.save();
            }
        } catch (error) {
            res.status(500).json(error);
        }
        
        res.status(200).json({user});
    }
    
}