import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, JoinTable} from "typeorm";
import { Role } from "./Role";

@Entity()
class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    public readonly id;

    private _username: string;
    private _password: string;
    private _isBlocked: boolean;
    private _roles: Role[];

    public hasRole(role: Role){
      const result = this.roles.find(element => element.name === role.name);

      return !!result;
    }

    public addRole(role: Role){
      this.roles.push(role);
    }

    // Setters and Getters
    @Column()
    public set username(value: string) { this._username = value; }
    public get username(): string { return this._username; }

    @Column()
    public set password(value: string) { this._password = value; }
    public get password(): string { return this._password; }

    @Column()
    public set isBlocked(value: boolean) { this._isBlocked = value; }
    public get isBlocked(): boolean { return this._isBlocked; }

    // Relationships
    @ManyToMany(type => Role)
    @JoinTable()
    public set roles(value: Role[]) { this._roles = value; }
    public get roles(): Role[] { return this._roles; }
}

export default User;
