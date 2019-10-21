import User from "../../Domain/Entity/User";
import Session from "../../Domain/Entity/Sessions";
import { UnauthorizedException } from "../Exceptions/UnauthorizedException";
import { EntityNotFound } from "../../Domain/Exceptions/EntityNotFound";
import {IHashService} from "./IHashService";

class AuthorizationService {

    private hashService: IHashService;

    public constructor(hashService: IHashService) {
        this.hashService = hashService;
    }

    public async getUserId(token: string): Promise<number> {
        const session: Session | undefined = await Session.findOne({ token: token });
        if(!session){
            throw new UnauthorizedException('Forbidden');
        }

        const result: number = await User.count({ where :{ id: session.id } });
        if (result != 1) {
            throw new EntityNotFound('User not found');
        }

        if (this.hashService.safeCompare(token, session.token)) {
            return session.id;
        }

        throw new UnauthorizedException('Forbidden');
    }
}

export default AuthorizationService;
