import "reflect-metadata"
import express from 'express';
import cors from 'cors'
import fileRoute from './routes/file.routes';
import { AppDataSource } from './data-source'

AppDataSource.initialize().then(() => {
    const app = express();
    const PORT = 3000;

    app.use(express.json());

    app.listen(PORT, () => {
        console.log(`Server running at port ${PORT}`);
    });

    app.use(
        cors({
            origin: '*',
            exposedHeaders: "*",
            methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
            credentials: true
        })
    );

    app.use(fileRoute)
})


