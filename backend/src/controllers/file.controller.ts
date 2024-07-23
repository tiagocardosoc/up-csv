import csvParser from "csv-parser";
import { Request, Response } from "express"
import { Readable } from "stream";
import { ICSVData } from "../interfaces/file.interface";
import { FilesRepository } from "../repositories/files.repository";

class FileController {
    static csvData: ICSVData[] = [];
    private fileRepository: FilesRepository

    constructor() {
        this.fileRepository = new FilesRepository()
    }

    async uploadFile(req: Request, res: Response) {
        try {
            if (!req.file) {
                res.status(400).json({ message: 'No file uploaded' });
                return;
            }

            const results: ICSVData[] = [];
            const buffer = req.file.buffer;
            const stream = Readable.from(buffer.toString());

            stream
                .pipe(csvParser())
                .on('data', (data: ICSVData) => results.push(data))
                .on('end', () => {
                    FileController.csvData = results;

                    FileController.csvData.forEach(async (item: ICSVData) => {
                        await this.fileRepository.create({ ...item })
                    })

                    res.status(200).json({ message: 'The file was uploaded successfully' });
                })
                .on('error', (error) => {
                    res.status(500).json({ message: 'Error processing file' });
                });
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

export default FileController