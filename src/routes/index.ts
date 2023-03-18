import { Router } from "express";
import {} from "./webhook.routes"

const router = Router();

router.use("/webhook", webhookRouter);

export { router };
