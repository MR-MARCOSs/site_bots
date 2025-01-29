import { Router } from "express";
import { ChatController } from "./controllers/chatController";
import { BotsController } from "./controllers/botsController";
import { UserController } from "./controllers/userController";
import { LoginController } from "./controllers/loginController";
import { authMiddleware } from "./middlewares/authMiddleware";
import path from 'path';

const routes = Router()


routes.get('/get-bots', new BotsController().list)
routes.post('/user', new UserController().create)
routes.post('/login', new LoginController().login)


routes.get('/login-page', (req, res) => {
  res.sendFile(path.join(__dirname, '../../usr/share/nginx/html', 'index.html'));
});
routes.get('/register-page', (req, res) => {
  res.sendFile(path.join(__dirname, '../../usr/share/nginx/html', 'register.html'));
});

routes.use(authMiddleware)
routes.post('/profile', new UserController().getProfile)
routes.get('/chats-page', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/private', 'chats.html'));
  });
routes.post('/get-response', new ChatController().getBotResponse);
routes.get('/get-chat', new ChatController().list);

export default routes