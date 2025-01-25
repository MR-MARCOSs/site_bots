import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../helpers/api-errors';
import jwt from 'jsonwebtoken';
import { userRepository } from '../repositories/userRepository';

type JwtPayload = {
    id: number;
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    // Recuperando o token dos cookies
    const token = req.cookies.token;

    console.log(token);

    if (!token) {
        throw new UnauthorizedError('Não autorizado');
    }

    try {
        // Verificando e decodificando o token
        const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayload;

        // Buscando o usuário no banco de dados com o id extraído do token
        const user = await userRepository.findOneBy({ id });

        if (!user) {
            throw new UnauthorizedError('E-mail ou senha inválidos');
        }

        // Excluindo a senha do usuário para não ser enviada
        const { password: _, ...loggedUser } = user;

        // Adicionando os dados do usuário ao objeto da requisição
        req.user = loggedUser;

        next();
    } catch (error) {
        throw new UnauthorizedError('Token inválido ou expirado');
    }
};
