import { Router } from "express";
import { ChatController } from "./controllers/chatController";

const routes = Router()

routes.post('/get-response', new ChatController().getBotResponse);
routes.get('/get-chat', new ChatController().list);

export default routes