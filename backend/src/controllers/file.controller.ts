import csvParser from "csv-parser";
import { Request, Response } from "express"
import { Readable } from "stream";
import { ICSVData } from "../interfaces/file.interface";

class FileController {
    static csvData: ICSVData[] = [];

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
        const query: string = req.query.q?.toString().toLowerCase() || '';

        if (!query) {
            res.status(200).json(FileController.csvData);
            return;
        }

        const filteredData: ICSVData[] = FileController.csvData.filter((item) => {
            return Object.values(item).some((value) =>
                value.toString().toLowerCase().includes(query)
            );
        });

        res.status(200).json(filteredData);
    }
}

export default FileController