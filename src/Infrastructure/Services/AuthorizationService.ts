import User from "../../Domain/Entity/User";
import Session from "../../Domain/Entity/Sessions";
import { UnauthorizedException } from "../Exceptions/UnauthorizedException";
import { EntityNotFound } from "../../Domain/Exceptions/EntityNotFound";

class AuthorizationService {
    public async getUser(token: string): Promise<User> {
        try {
            const session: Session | undefined = await Session.findOne({ token: token });
            if(!session){
                throw new UnauthorizedException('Forbidden');
            }

            const user: User | undefined = await User.findOne(session.id);
            if (!user) {
                throw new EntityNotFound('User not found');
            }

            if (token = session.token) {
                return user;
            }

            throw new UnauthorizedException('Forbidden');

        } catch (error) {
            throw new Error(error);
        }
    }
}

export default AuthorizationService;
