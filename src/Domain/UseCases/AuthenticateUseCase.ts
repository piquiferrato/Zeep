import User from '../Entity/User';

export default class AuthenticateUseCase{

    public static excecute(user : User, password : string) {

        return user.checkIfUnencryptedPasswordIsValid(password, user.password);
        
    }

}