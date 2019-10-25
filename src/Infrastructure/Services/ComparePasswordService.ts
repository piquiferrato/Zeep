import * as bcrypt from 'bcrypt';

export default class ComparePasswordService {
    public static checkIfUnencryptedPasswordIsValid(unencryptedPassword: string, hash : string) {
        var auth = false;
        if(bcrypt.compareSync(unencryptedPassword, hash)) {
            auth = true;
        }
        return auth;
    }
}
