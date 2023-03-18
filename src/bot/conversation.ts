import { Whatsapp, Message,Action, RequestContext, Response,  } from "venom-bot";

import { SimulateTyping } from "../utils/SimulateTyping";
import { SimulateRecordingAudio } from "../utils/SimulateRecordingAudio";
import { getProductName, getProduto } from "../utils/productInformation";
import { customerNameValidation } from "../utils/customerNameValidation";

import { getButtonProducts } from "./templates/ButtonProducts";
import { MenuButtons } from "./templates/MenuButtons";

interface ConversationState {
  step: number;
  answer?: string;
  country?: string;
  state?: string;
  senderName?: string;
  senderProduct?: string;
}
const conversationState: ConversationState = { step: 0 };

export async function Conversation(client: Whatsapp, message: Message) {
  const { step, answer, country, state } = conversationState;

  switch (step) {
    case 0:
      await askQuestion();
      break;
    case 1:
      await handleAnswer(message);
      break;

    case 2:
      await handleCountry(message);
      break;

    case 3:
      await handleState(message);
      break;
    case 4:
      await handleCity(message);
      break;
    default:
      break;
  }

  async function askQuestion() {
    conversationState.step = 1;
    await client.sendText(message.from, "Digite sua resposta:");
  }

  async function handleAnswer(message: any) {
    conversationState.answer = message.body;
    conversationState.step = 2;
    await client.sendText(
      message.from,
      `Sua resposta foi: ${conversationState.answer}. Em qual país você mora?`
    );
  }

  //async function askLocation() {
  // conversationState.step = 3;
  //}

  async function handleCountry(message: any) {
    conversationState.country = message.body;
    conversationState.step = 3;
    await client.sendButtons(
      message.chatId,
      "Selecione uma opção",
      MenuButtons,
      "Qual das situações você se encontra?"
    );

    
    await client.sendText(
      message.from,
      `Você mora no país ${conversationState.country}. Qual é o seu estado?`
    );
  }

  //async function askState() {
  //   conversationState.step = 5;
  // }

  async function handleState(message: any) {
    conversationState.state = message.body;
    conversationState.step = 4;
    await client.sendText(
      message.from,
      `Você mora no estado ${conversationState.state}. Qual é a sua cidade?`
    );
  }

  async function handleCity(message: any) {
    const city = message.body;
    await client.sendText(
      message.from,
      `Você mora na cidade de ${city}. Obrigado por conversar comigo!`
    );
    conversationState.step = 0;
  }
}

export class Conversation1 {
  private client: Whatsapp;
  private message: Message;
  state: string;

  private senderName;
  private senderProduct;
  private bb;

  constructor(client: Whatsapp, message: Message) {
    this.client = client;
    this.message = message;
    this.state;
  }

  async startName(name: string) {
    await this.sendMessage("Olá! Qual é o seu nome?");
    this.state = "name";
  }

  async handleName(name: string) {
    await this.sendMessage(`Oi, ${name}! Em qual país você mora?`);
    this.senderName = name;
    this.state = "country";
  }

  async handleCountry(country: string) {
    await this.sendMessage(`Legal! Em qual estado você mora em ${country}?`);
    this.state = "state";
  }

  async handleState(state: string) {
    await this.sendMessage(`Bacana! E em qual cidade você mora em ${state}?`);
    this.state = "city";
  }

  async handleCity(city: string) {
    await this.sendMessage(`Obrigado por responder. Até a próxima!`);
    this.state = "end";
  }

  async sendMessage(text: string) {
    await this.client.sendText(this.message.from, text);
  }

  async start() {
    switch (this.state) {
      case "start":
        //await this.startName(this.message.body);

        await this.sendMessage("Olá! Qual é o seu nome?");
        this.state = "name";
        break;
      case "name":
        await this.handleName(this.message.body);
        break;
      case "country":
        await this.handleCountry(this.message.body);
        break;
      case "state":
        await this.handleState(this.message.body);
        break;
      case "city":
        await this.handleCity(this.message.body);
        break;
      default:
        break;
    }
  }
}

/*
export async function Conversation1(client: Whatsapp, message: Message) {
  const remetenteId = message.from;
  const remetenteMessage = message.body;
  const remetenteNumber = message.chatId;

  //const ButtonProducts =

  let checkProductName;
  let checkClientName;

  // Para Clientes:  Pinterest | Facebook
  if (remetenteMessage.includes("Olá, gostei muito do")) {
    await client.sendButtons(
      remetenteNumber,
      "Selecione uma opção:",
      MenuButtons,
      "Qual das situações você se encontra?"
    );
    await SimulateTyping(client, remetenteNumber, 3);
    await client.sendText(remetenteId, "Olá, tudo bem? Meu nome é *Walyson*");
    await SimulateTyping(client, remetenteNumber, 1);
    await client.sendText(
      remetenteId,
      "sou responsável pelas vendas da *Wizen Shop* 😊"
    );
    checkProductName = await getProductName(remetenteMessage);
    await SimulateTyping(client, remetenteNumber, 2);
    await client.sendText(
      remetenteId,
      `Recebi uma notificação de que você se interessou pelo nosso produto ${checkProductName} 🥰❤`
    );
    await SimulateTyping(client, remetenteNumber, 3);
    await client.sendText(
      remetenteId,
      "Mas antes de começarmos, gostaria de saber *o seu nome*"
    );
    await SimulateTyping(client, remetenteNumber, 1);
    await client.sendText(
      remetenteId,
      "para que possa me dirigir a você de maneira mais *personalizada* 😉"
    );
    await client.sendText(remetenteId, "Qual o seu Nome?");
  }

  // Para Clientes: TikTok | Instagram
  if (
    remetenteMessage ==
    "Olá, gostei muito de um produto das suas redes sociais!. Quero saber mais sobre ele!"
  ) {
    await SimulateTyping(client, remetenteNumber, 3);
    await client.sendText(
      remetenteId,
      "Olá, tudo bem? Vi que você se interessou pelo nosso produto nas nossas redes sociais😊."
    );
    await SimulateTyping(client, remetenteNumber, 2);
    await client.sendText(
      remetenteId,
      "Mas antes de começarmos, gostaria de saber *o seu nome*"
    );
    await SimulateTyping(client, remetenteNumber, 1);
    await client.sendText(
      remetenteId,
      "para que possa me dirigir a você de maneira mais *personalizada* 😉"
    );
    await client.sendText(remetenteId, "Qual o seu Nome?");
  }

  // Nome do Cliente

  if (!checkClientName && !checkProductName) {
    checkClientName = customerNameValidation(remetenteMessage);

    await client.sendText(
      remetenteId,
      `Olá ${checkClientName}!😊, Por favor digite o produto que chamou sua atenção e deixe-me ajudá-lo a encontrá-lo!`
    );
  }

  // Nome do Cliente e Produto
  if (!checkClientName && checkProductName) {
    checkClientName = customerNameValidation(remetenteMessage);
    const allProductInformation = getProduto(checkProductName);
    await client.sendText(
      remetenteId,
      `Olá ${checkClientName}!😊,  Excelente escolha! o ${
        (
          await allProductInformation
        ).name
      } `
    );
  }

  if (checkClientName && !checkProductName) {
    //  Nome do Produto
    checkProductName = await getProductName(remetenteMessage);

    if (checkProductName == null) {
      await client.sendText(
        remetenteId,
        `Desculpe ${checkProductName}, não consegui identificar o produto que você deseja. Por favor, escolha uma opção abaixo:`
      );
      /*
      const ButtonProducts = await getButtonProducts();
      await client.sendButtons(
        remetenteNumber,
        "Produtos",
        await ButtonProducts,
        "Lista com todos os Produtos"
      );
      */

/*

    // Mensagem quebrando objeções
    const allProductInformation = getProduto(checkProductName);
    await client.sendText(
      remetenteId,
      `Olá ${checkClientName}!😊,  Excelente escolha, o ${
        (
          await allProductInformation
        ).name
      }`
    );
  }

  if (checkClientName & checkProductName) {
  } else {
    await client.sendButtons(
      remetenteNumber,
      "Selecione uma opção:",
      MenuButtons,
      "Qual das situações você se encontra?"
    );
  }

 
}
*/
