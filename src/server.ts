import express from "express";
import bodyParser from "body-parser";
//import cors from "cors";

import { create, Whatsapp } from "venom-bot";
import { WhatsAppBot } from "./bot/index";

const app = express();

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// Endpoint que irá receber as mensagens do WhatsApp
// app.post("/webhook", async (req, res) => {
//  const { body } = req;

const bot = new WhatsAppBot();
bot.start();
//res.sendStatus(200);
// });

/*
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});

*/
