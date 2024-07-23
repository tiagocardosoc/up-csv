import { ICSVData } from "../../interfaces/file.interface";
import { Request, Response } from "express"
import { FilesRepositoryStub } from "./FileRepositoryStub";
import { Readable } from "stream";
import csvParser from "csv-parser";
import FileController from "../../controllers/file.controller";

class FileControllerStub {
    static csvData: ICSVData[] = [];
    private fileRepository: FilesRepositoryStub

    constructor() {
        this.fileRepository = new FilesRepositoryStub()
    }

    async uploadFile(req: Request, res: Response) {
        try {
            if (!req.file) {
                res.status(400).json({ message: 'No file uploaded' });
                return;
            }

            res.status(200).json({ message: 'The file was uploaded successfully' });
        } catch (error) {
            res.status(500).json({ message: "Server error, try again later.", error: true })
        }

    }

    async searchFile(req: Request, res: Response) {
        try {
            const query: string = req.query.q?.toString().toLowerCase() || '';

            if (!query) {
                const data = await this.fileRepository.findAll({});
                res.status(200).json(data);
                return;
            }

            const filteredData = await this.fileRepository.search(query);

            res.status(200).json(filteredData);
        } catch (error) {
            res.status(500).json({ message: "Server error, try again later.", error: true })
        }

    }
}

export default FileControllerStub