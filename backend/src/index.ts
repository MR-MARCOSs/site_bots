import 'express-async-errors';
import express from 'express';
import { AppDataSource } from './data-source';
import routes from './routes';
import { errorMiddleware } from './middlewares/error';
import cors from 'cors';
import path from 'path';

AppDataSource.initialize().then(() => {
    const app = express();


    app.use(express.static(path.join(__dirname, '../../frontend/public')));
    // Habilitar o CORS para todas as origens
    app.use(cors());

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