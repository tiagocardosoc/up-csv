//@ts-nocheck
import { beforeEach, describe, expect, it, vi } from "vitest";
import FileControllerStub from "../stub/FileControllerStub";
import { FilesRepositoryStub } from "../stub/FileRepositoryStub";

describe('File Controller', () => {

    let fileController: FileControllerStub;
    let fileRepository: FilesRepositoryStub;

    beforeEach(() => {
        fileRepository = new FilesRepositoryStub();
        fileController = new FileControllerStub();
    });

    it("Show error if no file has setted to upload a file", async () => {
        const req = {
            query: {}
        } as unknown as Request;
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        } as unknown as Response;

        await fileController.uploadFile(req, res)


        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ message: 'No file uploaded' });
    })

    it("Show success at upload file", async () => {
        const req = {
            file: {
                buffer: Buffer.from('name,city,country,favorite_sport\nTiago,Recife,Brazil,football')
            },
            query: {}
        } as unknown as Request;

        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        } as unknown as Response;

        await fileController.uploadFile(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({ message: 'The file was uploaded successfully' });
    })

    it("Show sucess when try to find a file", async () => {
        const req = {
            query: {
                q: "Braz"
            }
        } as unknown as Request;

        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        } as unknown as Response;

        await fileController.searchFile(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith([{ id: 1, name: 'tiago', city: 'Recife', country: 'Brazil', favorite_sport: 'football' }, { id: 2, name: 'Cardoso', city: 'Olinda', country: 'Brazil', favorite_sport: 'football' }]);
    })
}) 