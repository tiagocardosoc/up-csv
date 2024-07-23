import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'files' })
export class FilesModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name!: string;

    @Column()
    city!: string;

    @Column()
    country!: string;

    @Column()
    favorite_sport!: string;
}
