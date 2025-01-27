import { AppDataSource } from "../data-source";
import { Chat } from "../entities/Chat";

export const chatRepository = AppDataSource.getRepository(Chat)