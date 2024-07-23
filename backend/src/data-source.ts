import 'reflect-metadata';
import { DataSource } from "typeorm";
import { FilesModel } from './models/files.model';

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'data/database.sqlite',
    synchronize: true,
    logging: false,
    entities: [FilesModel],
});
