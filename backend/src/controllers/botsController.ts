import { BotsRepository } from "../repositories/botsRepository";
import { Request, Response } from 'express';


export class BotsController {
    async list(req: Request, res: Response){
        try {
            const bots = await BotsRepository.find()
            res.status(200).json(bots);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar mensagens' });
        }
    }
}
