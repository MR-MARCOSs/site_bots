import { Router } from "express";
import { getBotResponse } from "./controllers/getBotResController";

const routes = Router()

routes.post('/get-response', getBotResponse);

export default routes 