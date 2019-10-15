import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, BaseEntity} from "typeorm"
import User from "./User";

@Entity()
class Session extends BaseEntity{

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    accesToken: string;

    @OneToOne(type => User)
    @JoinColumn()
    user: User;

    public static generateAccessToken(length){
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    public static ACCESS_TOKEN_LENGTH : number = 20;
}

export default Session;