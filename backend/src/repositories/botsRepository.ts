import { AppDataSource } from "../data-source";
import { Bot } from "../entities/Bot";


export const BotsRepository = AppDataSource.getRepository(Bot)