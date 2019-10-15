import {Request, Response} from 'express';
import User from '../Entity/User';

export class UserController{

    public static async store(req: Request, res: Response) {
        const user = new User();

        const {name, dni, password} = req.body;
        
        user.name = name;
        user.dni = dni;
        user.isBlocked = false;
        console.log(user.hashPassword(password));
        user.password = user.hashPassword(password);

        try{
            await user.save();
        } catch (error) {
            res.status(500).json(error);
        }
        
        res.status(200).json({user});
    }

    public static async show(req: Request, res: Response){
        const {id} = req.params;
        const user = await User.findOne(id);
        res.status(200).json({user});
    }
}