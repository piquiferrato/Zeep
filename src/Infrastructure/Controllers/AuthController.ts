import {Response, Request} from 'express';
import User from '../../Domain/Entity/User';
import {IHashService} from "../Services/IHashService";
import Session from "../../Domain/Entity/Sessions";

export class AuthController {

    private hashService :IHashService;

    public constructor(hashService: IHashService){
        this.hashService = hashService;
    }

    public login = async (req: Request, res: Response): Promise<void> => {
        const { username, password } = req.body;

        const user = await User.findOne({ where: { username }});
        const result = this.hashService.safeCompare(this.hashService.make(password), user.password);

        if(!result){
            return res.status(401).end();
        }

        const session = new Session();
        session.userId = user.id;
        // TODO:  session.token =

        try {
            session.save();
        } catch (error) {
            return res.status(500).json({ok: false, error}).end();
        }

        return res.status(200).json({token: session.token}).end();
    };

    public register = async (req: Request, res: Response): Promise<void> => {
        const {username, password} = req.body;

        const user = new User();
        user.isBlocked = false;
        user.username = username;
        user.password = this.hashService.make(password);

        try {
            user.save();
        } catch (error) {
            return res.status(500).json({ok: false, error}).end();
        }

        return res.json({ok: true, user: {username: user.username}}).end();
    };
}
