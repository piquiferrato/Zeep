import {LoginCommand} from "../../Infrastructure/Commands/LoginCommand";
import User from "../Entity/User";
import {inject, injectable} from "inversify";
import {IHashService} from "../../Infrastructure/Services/IHashService";
import TYPES from "../../types";
import {UnauthorizedException} from "../../Infrastructure/Exceptions/UnauthorizedException";
import Session from "../Entity/Sessions";

@injectable()
export class AuthService {
    private hashService: IHashService;

    public constructor(@inject(TYPES.IHashService) hashService: IHashService){
        this.hashService = hashService;
    }

    public login = async (command: LoginCommand) =>{
        let user;
        try {
            user = await User.findOneOrFail({ where: { username: command.getUsername }});
        }catch (e) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const result = this.hashService.safeCompare(this.hashService.make(command.getPassword), user.password);

        if(result){
            throw new UnauthorizedException('Invalid credentials');
        }

        const session = new Session();
        session.userId = user.id;
        session.token = this.hashService.newToken();

        const {token} = await session.save();

        return {token};
    }
}