import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne} from "typeorm";
import User from "./User"

@Entity()
class Post extends BaseEntity{

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public title: string;

    @Column()
    public body: number;
    
    @ManyToOne(type => User, user => user.posts)
    user: User;

}

export default Post;