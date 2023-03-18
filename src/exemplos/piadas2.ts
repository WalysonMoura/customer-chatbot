/*

import { create, Whatsapp } from 'venom-bot';
import axios from 'axios';

create().then((client: Whatsapp) => start(client));

async function start(client: Whatsapp) {
  console.log('Bot iniciado!');

  client.onMessage(async (message) => {
    if (message.body === '!ping') {
      await client.sendText(message.from, 'Pong!');
    } else if (message.body === '!joke') {
      const joke = await getJoke();
      await client.sendText(message.from, joke);
    }
  });
}

async function getJoke() {
  const response = await axios.get('https://api.chucknorris.io/jokes/random');
  const joke = response.data.value;
  return joke;
}
*/