import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export default class Faculty extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    logoUrl: string;

}