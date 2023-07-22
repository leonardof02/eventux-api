import { Entity, PrimaryGeneratedColumn, BaseEntity, Column } from "typeorm";

@Entity()
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    profileImgUrl: string;

    @Column()
    isAdmin: boolean;
}
