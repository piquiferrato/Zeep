import {Request, Response} from 'express';
import User from '../Entity/User';
import { Role } from '../Entity/Role';

export class UserController{

    public static store(req: Request, res: Response) {
        const user = new User();

        const {username, password} = req.body;

        user.isBlocked = false;
        user.username = username;
        user.password = password;

        try{
            user.save();
        } catch (error) {
            res.status(500).json(error);
        }

        res.json({user});
    }

    public static async show(req: Request, res: Response){
        const {id} = req.params;
        const user = await User.findOne(id, {relations: ['roles']});
        res.json({user});
    }

    public static async update(req: Request, res: Response){
        const {id} = req.params;
        const roleName = req.body.role;

        const user: User = await User.findOne(id);

        try{
          const role: Role = await Role.findOneOrFail({ where: { name: roleName} });

          user.addRole(role);
          user.save();

        } catch(e) {
          res.status(500).json(e);
        }

        res.json({user});
    }
}
