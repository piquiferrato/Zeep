import {BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, PrimaryColumn} from "typeorm";
import User from "./User";

@Entity()
class Session extends BaseEntity{

    @PrimaryColumn()
    @OneToOne(type => User)
    @JoinColumn()
    public userId: number;

    @Column()
    public token: string;
}

export default Session;
