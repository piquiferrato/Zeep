import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import User from "./User";

@Entity()
class Session extends BaseEntity{

    @PrimaryGeneratedColumn()
    public id: number;
    private _userId: number;
    private _token: string;

    @Column()
    get token(): string { return this._token; }
    set token(value: string) { this._token = value; }

    @OneToOne(type => User)
    get userId(): number { return this._userId; }
    set userId(value: number) { this._userId = value; }
}

export default Session;
