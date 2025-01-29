import 'express-async-errors';
import express from 'express';
import { AppDataSource } from './data-source';
import routes from './routes';
import { errorMiddleware } from './middlewares/error';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';

// Inicializa a conexão com o banco de dados
AppDataSource.initialize().then(() => {
    const app = express();

    // Configura o middleware para servir arquivos estáticos
    app.use(express.static(path.join(__dirname, '../frontend')));

    // Configura o CORS
    app.use(cors({
        origin: 'https://site-bots.onrender.com',  
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));
    

    // Configura o cookie-parser
    app.use(cookieParser());

    // Configura o middleware para parsear JSON
    app.use(express.json());

    // Configura as rotas
    app.use(routes);

    // Configura o middleware de erro (deve ser registrado após todas as rotas)
    app.use(errorMiddleware);

    // Define a porta
    const port = process.env.PORT || 3000;
    return app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}).catch(error => {
    console.error('Error during Data Source initialization:', error);
});