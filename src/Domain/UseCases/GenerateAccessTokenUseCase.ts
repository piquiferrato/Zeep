import Session from '../Entity/Session';

export default class AuthenticateUseCase{

    public static excecute() {
        return Session.generateAccessToken(Session.ACCESS_TOKEN_LENGTH);
    }

}