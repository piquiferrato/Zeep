import { PrimaryGeneratedColumn, Column, Entity, BaseEntity } from "typeorm";

@Entity()
export class Role extends BaseEntity {

    @PrimaryGeneratedColumn()
    public readonly id: number;

    private _name: string;

    @Column({unique: true})
    public set name(value: string) { this._name = value; }
    public get name(): string { return this._name; }
}
