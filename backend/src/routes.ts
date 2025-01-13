import { Router } from "express";
import { ChatController } from "./controllers/chatController";
import { BotsController } from "./controllers/botsController";

const routes = Router()

routes.post('/get-response', new ChatController().getBotResponse);
routes.get('/get-chat', new ChatController().list);
routes.get('/get-bots', new BotsController().list)

export default routes