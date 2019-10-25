import {Response, Request} from 'express';
import User from '../../Domain/Entity/User';
import {IHashService} from "../Services/IHashService";
import {inject, injectable} from "inversify";
import TYPES from "../../types";
import {LoginAdapter} from "../Adapters/LoginAdapter";
import {ValidatorService} from "../Services/ValidatorService";
import {LoginCommand} from "../Commands/LoginCommand";
import {AuthService} from "../../Domain/Service/AuthService";

@injectable()
export class AuthController {

    private hashService: IHashService;
    private loginAdapter: LoginAdapter;
    private authService: AuthService;

    public constructor(
        @inject(TYPES.IHashService) hashService: IHashService,
        @inject(LoginAdapter) loginAdapter: LoginAdapter,
        @inject(AuthService) authService: AuthService
    ) {
        this.hashService = hashService;
        this.loginAdapter = loginAdapter;
        this.authService = authService;
    }

    public login = async (req: Request, res: Response): Promise<void> => {
        const command: LoginCommand = await this.loginAdapter.adapt(req);
        const {token} = await this.authService.login(command);

        res.status(200).json({token}).end();
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
