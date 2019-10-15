import * as bcrypt from 'bcrypt';

export class HashService implements IHashService{
    public hash(password: string): string {
      let hashedPassword = bcrypt.hashSync(password, 10);
      return hashedPassword;
    }
}
