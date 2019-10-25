import User from "../../Domain/Entity/User";
import Session from "../../Domain/Entity/Sessions";
import { UnauthorizedException } from "../Exceptions/UnauthorizedException";
import { EntityNotFound } from "../../Domain/Exceptions/EntityNotFound";
import {IHashService} from "./IHashService";
import {inject, injectable} from "inversify";
import TYPES from "../../types";

@injectable()
class CurrentUserService {

    private hashService: IHashService;

    public constructor(@inject(TYPES.IHashService) hashService: IHashService) {
        this.hashService = hashService;
    }

    public async getUserId(token: string): Promise<number> {
        const session = await Session.findOne({where: {token: token}});
        const user = await User.findOne({ where :{ id: session.userId, isBlocked: false} });

        if (this.hashService.safeCompare(token, session.token)) {
            return user.id;
        }
        throw new UnauthorizedException('Forbidden');
    }
}

export default CurrentUserService;
