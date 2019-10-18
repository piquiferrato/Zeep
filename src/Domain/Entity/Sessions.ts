import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import User from "./User";

@Entity()
class Session extends BaseEntity{

    @PrimaryGeneratedColumn()
    public id: number;

    @OneToOne(type => User)
    public userId: number;

    @Column()
    public token: string;

    public constructor(userId: number, token: string){
        super();
        this.userId = userId;
        this.token = token;
    }
}

export default Session;
