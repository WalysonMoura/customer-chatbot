/*

import { create } from 'venom-bot';

export const client = await create();

client.onStateChange((state) => {
  console.log('State changed:', state);
});

require('dotenv').config();
const { create, Whatsapp } = require('venom-bot');
const { google } = require('googleapis');
const axios = require('axios');

const auth = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);
auth.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

async function sendMessage(client, message) {
  return client.sendText(message.to, message.text, message.button);
}

async function sendImage(client, message) {
  const url = await axios.get(message.imageUrl, { responseType: 'arraybuffer' });
  const response = await client.sendImage(
    message.to,
    Buffer.from(url.data),
    message.caption
  );
  return response.messageId;
}

async function start() {
  const client = await create({
    apiKey: process.env.VENONBOT_API_KEY,
  });

  client.onMessage(async (message) => {
    const response = { to: message.from };

    switch (message.body) {
      case 'Comprar':
        const imageUrl = 'url_da_imagem_no_google_drive';
        response.text = 'Clique no botão abaixo para comprar o produto.';
        response.button = [
          {
            buttonText
*/