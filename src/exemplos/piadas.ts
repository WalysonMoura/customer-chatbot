
interface Joke {
  id: number;
  type: string;
  setup: string;
  punchline: string;
}
/*

import { create, Whatsapp } from 'venom-bot';
import axios, { AxiosResponse } from 'axios';

async function getJoke(): Promise<string> {
  try {
    const response: AxiosResponse<Joke> = await axios.get('https://official-joke-api.appspot.com/jokes/random');
    const joke = response.data;
    return `${joke.setup} ${joke.punchline}`;
  } catch (error) {
    console.error(`Erro ao buscar a piada: ${error}`);
    throw error;
  }
}

create({
  session: 'my-session',
  catchQR: true,
  headless: true,
}).then((client: Whatsapp) => {
  console.log('Cliente iniciado!');

  client.onMessage(async (message) => {
    console.log(`Mensagem recebida: ${message.body}`);

    if (message.body === 'piada') {
      const joke = await getJoke();
      client.sendText(message.from, joke);
    } else {
      client.sendText(message.from, 'Desculpe, não entendi a mensagem.');
    }
  });
}).catch((error: any) => {
  console.error(`Erro ao iniciar o cliente: ${error}`);
});
/*
