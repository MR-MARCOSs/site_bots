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


    app.use(express.static(path.join(__dirname, '../../frontend')));
    // Habilitar o CORS para todas as origens
    app.use(cors({
        origin: 'http://localhost:3000',  // URL do seu frontend
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization']  // Permite o header Authorization
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