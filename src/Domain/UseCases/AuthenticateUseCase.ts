import User from '../Entity/User';
import ComparePasswordService from '../../Infrastructure/Services/ComparePasswordService';

export default class AuthenticateUseCase{

    public static excecute(user : User, password : string) {

        return ComparePasswordService.checkIfUnencryptedPasswordIsValid(password, user.password);
        
    }

}