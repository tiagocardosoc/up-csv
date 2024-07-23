
import { FindManyOptions, FindOneOptions, Repository } from "typeorm";
import { FilesModel } from "../../models/files.model";

export class FilesRepositoryStub {
    async create(fileData: Partial<FilesModel>): Promise<FilesModel> {
        if (fileData) {
            return {
                id: 1,
                name: fileData.name!,
                city: fileData.city!,
                country: fileData.country!,
                favorite_sport: fileData.favorite_sport!
            }
        }

        return Promise.reject(Error());
    }

    async findAll(where: FindManyOptions<FilesModel>): Promise<FilesModel[]> {
        return [{ id: 1, name: 'tiago', city: 'Recife', country: 'Brazil', favorite_sport: 'football' }, { id: 2, name: 'Cardoso', city: 'Olinda', country: 'Brazil', favorite_sport: 'football' }]
    }

    async search(query: string): Promise<FilesModel[]> {
        return [{ id: 1, name: 'tiago', city: 'Recife', country: 'Brazil', favorite_sport: 'football' }, { id: 2, name: 'Cardoso', city: 'Olinda', country: 'Brazil', favorite_sport: 'football' }]
    }
}