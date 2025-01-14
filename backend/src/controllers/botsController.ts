import { BotsRepository } from "../repositories/botsRepository";
import { Request, Response } from 'express';


export class BotsController {
    async list(req: Request, res: Response){
        const bots = await BotsRepository.find()
        res.status(200).json(bots);
    }
}
