import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, JoinTable} from "typeorm";
import User from "./User";

@Entity()
class Roles extends BaseEntity{

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @ManyToMany(type => User)
    @JoinTable()
    categories: User[];

}

export default Roles;