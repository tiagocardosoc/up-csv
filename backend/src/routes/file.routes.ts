import { Router } from "express";
import multer from "multer";
import FileController from "../controllers/file.controller";

const fileRoute = Router();
const fileController = new FileController()

const storage = multer.memoryStorage();
const upload = multer({ storage });

fileRoute.post(
    '/api/files',
    upload.single('file'),
    fileController.uploadFile.bind(fileController)
)

fileRoute.get('/api/users',
    fileController.searchFile.bind(fileController)
)


export default fileRoute;