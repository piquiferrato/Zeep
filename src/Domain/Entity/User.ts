import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany} from "typeorm";
import Post from "./Post"

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

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string, hash : string) {
        var auth = false;
        if(bcrypt.compareSync(unencryptedPassword, hash)) {
            auth = true;
        }
        return auth;
    }


}

export default User;
