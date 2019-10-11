import {Request, Response} from 'express';
import User from '../Entity/User';

export class UserController{

    public static store(req: Request, res: Response) {
        const user = new User();

        const {name, dni} = req.body;

        user.name = name;
        user.dni = dni;

        try{
            user.save();
        } catch (error) {
            res.sendStatus(500).json(error);
        }

        res.sendStatus(200).json({user});
    }

    public static async show(req: Request, res: Response){
        const {id} = req.params;
        const user = await User.findOne(id);
        res.sendStatus(200).json({user});
    }
}
