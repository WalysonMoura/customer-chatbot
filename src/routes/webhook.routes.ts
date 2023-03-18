import { Router } from "express";
import { create, Whatsapp } from "venom-bot";

import { WebhookController } from "../controllers/webhookController";

const webhookRouter = Router();
const webhookController = new WebhookController();

//Routes 
webhookRouter.post("/", webhookController.handle);


export { webhookRouter };
