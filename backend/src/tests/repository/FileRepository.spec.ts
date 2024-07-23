import { describe, expect, it, vi } from 'vitest';
import { FilesRepositoryStub } from '../stub/FileRepositoryStub';

describe('File Repository', () => {

    it('should upload and save file data', async () => {
        const fileRepository = new FilesRepositoryStub();

        const fileRepositorySpy = vi.spyOn(fileRepository, 'create');

        const response = await fileRepository.create({
            id: 1,
            name: 'Tiago',
            city: 'Recife',
            country: 'Brazil',
            favorite_sport: 'football'
        });

        expect(fileRepositorySpy).toHaveBeenCalled();
        expect(response).toEqual({
            id: 1,
            name: 'Tiago',
            city: 'Recife',
            country: 'Brazil',
            favorite_sport: 'football'
        });
    });

    it('should return all data', async () => {
        const fileRepository = new FilesRepositoryStub();

        const fileRepositorySpy = vi.spyOn(fileRepository, 'findAll');

        const response = await fileRepository.findAll({})

        expect(fileRepositorySpy).toHaveBeenCalled();
        expect(response).toEqual([{ id: 1, name: 'tiago', city: 'Recife', country: 'Brazil', favorite_sport: 'football' }, { id: 2, name: 'Cardoso', city: 'Olinda', country: 'Brazil', favorite_sport: 'football' }])

    })

    it('should return data as request on query', async () => {
        const fileRepository = new FilesRepositoryStub();

        const fileRepositorySpy = vi.spyOn(fileRepository, 'search');

        const response = await fileRepository.search('brazil')

        expect(fileRepositorySpy).toHaveBeenCalled();
        expect(response).toEqual([{ id: 1, name: 'tiago', city: 'Recife', country: 'Brazil', favorite_sport: 'football' }, { id: 2, name: 'Cardoso', city: 'Olinda', country: 'Brazil', favorite_sport: 'football' }])
    })
});
