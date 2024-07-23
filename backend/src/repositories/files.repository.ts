
import { FindManyOptions, FindOneOptions, Repository } from "typeorm";
import { FilesModel } from "../models/files.model";
import { AppDataSource } from "../data-source";

export class FilesRepository {

    private filesDatabase: Repository<FilesModel>

    constructor() {
        this.filesDatabase = AppDataSource.getRepository(FilesModel)
    }

    async create(fileData: Partial<FilesModel>): Promise<FilesModel> {
        return await this.filesDatabase.save(fileData);
    }

    async findAll(where: FindManyOptions<FilesModel>): Promise<FilesModel[]> {
        return await this.filesDatabase.find(where)
    }

    async search(query: string): Promise<FilesModel[]> {
        const qb = this.filesDatabase.createQueryBuilder("file");

        const columns = this.filesDatabase.metadata.columns.map(column => column.propertyName);

        columns.forEach((column, index) => {
            if (index === 0) {
                qb.where(`LOWER(file.${column}) LIKE :query`, { query: `%${query}%` });
            } else {
                qb.orWhere(`LOWER(file.${column}) LIKE :query`, { query: `%${query}%` });
            }
        });

        return await qb.getMany();
    }

}