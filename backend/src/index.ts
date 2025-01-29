import 'express-async-errors';
import express from 'express';
import { AppDataSource } from './data-source';
import routes from './routes';
import { errorMiddleware } from './middlewares/error';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';

// Use cookie-parser antes das rotas que utilizam os cookies


AppDataSource.initialize().then(() => {
    const app = express();


    app.use(express.static('dist/public'));
    app.use(express.static('dist/private'));

    app.use(cors({
        origin: 'http://localhost:3000',  
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));
    app.use(cookieParser());
    app.use(express.json());

    app.use(routes);

    // Middleware de erro deve ser registrado após todas as rotas
    app.use(errorMiddleware);

    // Definir a porta
    const port = process.env.PORT || 3000;
    return app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
});