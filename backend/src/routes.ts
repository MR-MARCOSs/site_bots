import { Router } from "express";
import { ChatController } from "./controllers/chatController";
import { BotsController } from "./controllers/botsController";
import { UserController } from "./controllers/userController";
import { LoginController } from "./controllers/loginController";
import { authMiddleware } from "./middlewares/authMiddleware";

const routes = Router()

routes.post('/get-response', new ChatController().getBotResponse);
routes.get('/get-chat', new ChatController().list);
routes.get('/get-bots', new BotsController().list)
routes.post('/user', new UserController().create)
routes.post('/login', new LoginController().login)

routes.use(authMiddleware)
routes.post('/profile', new UserController().getProfile)

export default routes