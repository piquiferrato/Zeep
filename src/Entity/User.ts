import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany} from "typeorm";
import Post from "./Post"
const bcrypt = require('bcrypt');

@Entity()
class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @Column()
    public dni: number;

    @Column()
    public password: string;

    @Column()
    public isBlocked : boolean;

    @OneToMany(type => Post, post => post.user)
    posts: Post[];

    hashPassword(password : string) {
        let hashedPassword = bcrypt.hashSync(password, 10);
        return hashedPassword;
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string, hash : string) {
        var auth = false;
        if(bcrypt.compareSync(unencryptedPassword, hash)) {
            auth = true;
        }
        return auth;
    }

    
}

export default User;