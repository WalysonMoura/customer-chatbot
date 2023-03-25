import { Whatsapp, Message } from "venom-bot";

import { SimulateTyping } from "../utils/SimulateTyping";
import { SimulateRecordingAudio } from "../utils/SimulateRecordingAudio";
import { getProductName, getProduct } from "../utils/productInformation";
import { customerNameValidation } from "../utils/customerNameValidation";
import { IProduct } from "../utils/products";

import { nlpManagerConversation } from "./nlp/";

import { getButtonProducts } from "./templates/ButtonProducts";
import { MenuButtons } from "./templates/MenuButtons";

interface ConversationState {
  step: string;
  answer?: string;
  country?: string;
  state?: string;
  senderName?: string;
  senderProduct?: IProduct;
  senderProductName?: string;
}
const conversationState: ConversationState = { step: "initialize" };

export async function Conversation(client: Whatsapp, message: Message) {
  const { step, answer, country, state, senderName, senderProduct } =
    conversationState;

  switch (step) {
    case "initialize":
      await askQuestion(message);
      break;

    case "askSenderName":
      await handleSenderName(message);
      break;

    case "askSenderNameAndProductName":
      await handleSenderNameAndProductName(message);
      break;

    case "askProductName":
      await handleProductName(message);
      break;

    case "breakingObjections":
      await handleBreakingObjections(message);
      break;

    default:
      await askNlpManagerConversation(message);
      break;
  }

  async function askQuestion(message: Message) {
    const {
      from: senderId,
      body: senderMessage,
      chatId: senderNumber,
    } = message;

    if (
      senderMessage ==
      "Olá, gostei muito de um produto das suas redes sociais!. Quero saber mais sobre ele!"
    ) {
      conversationState.step = "askSenderNameAndProductName";
      await SimulateTyping(client, senderNumber, 3);
      await client.sendText(
        senderId,
        "Olá, tudo bem? Vi que você se interessou pelo nosso produto nas nossas redes sociais😊."
      );
      await SimulateTyping(client, senderNumber, 2);
      await client.sendText(
        senderId,
        "Mas antes de começarmos, gostaria de saber *o seu nome*"
      );
      await SimulateTyping(client, senderNumber, 1);
      await client.sendText(
        senderId,
        "para que possa me dirigir a você de maneira mais *personalizada* 😉"
      );
      await client.sendText(senderId, "Qual o seu Nome?");
    }
    const checkMessage = senderMessage.match(/Olá, gostei muito do (.+)/i);
    if (checkMessage) {
      conversationState.step = "askSenderName";
      await client.sendButtons(senderId,"", MenuButtons,"").catch(error => {
        console.error('Error:', error);
      });
      await SimulateTyping(client, senderNumber, 3);
      await client.sendText(senderId, "Olá, tudo bem? Meu nome é *Walyson*");

      await SimulateTyping(client, senderNumber, 1);
      await client.sendText(
        senderId,
        "sou responsável pelas vendas da *Wizen* 😊"
      );

      // Nome do Produto
      conversationState.senderProductName = await getProductName(senderMessage);

      await SimulateTyping(client, senderNumber, 2);
      await client.sendText(
        senderId,
        `Recebi uma notificação de que você se interessou pelo nosso produto *${conversationState.senderProductName}* 🥰❤`
      );
      await SimulateTyping(client, senderNumber, 3);
      await client.sendText(
        senderId,
        "Mas antes de começarmos, gostaria de saber *o seu nome*"
      );
      await SimulateTyping(client, senderNumber, 1);
      await client.sendText(
        senderId,
        "para que possa me dirigir a você de maneira mais *personalizada* 😉"
      );
      await client.sendText(senderId, "Qual o seu Nome?");
    } else {
      await askNlpManagerConversation(message);
    }
  }

  async function handleSenderName(message: Message) {
    conversationState.step = "breakingObjections";

    const {
      from: senderId,
      body: senderMessage,
      chatId: senderNumber,
    } = message;

    conversationState.senderName = await customerNameValidation(senderMessage);
    conversationState.senderProduct = await getProduct(
      conversationState.senderProductName
    );
    await SimulateTyping(client, senderNumber, 2);
    await client.sendText(
      message.from,
      `Olá ${conversationState.senderName}.Excelente escolha! o ${conversationState.senderProductName}`
    );
  }

  async function handleSenderNameAndProductName(message: Message) {
    conversationState.step = "askProductName";

    const {
      from: senderId,
      body: senderMessage,
      chatId: senderNumber,
    } = message;

    conversationState.senderName = await customerNameValidation(senderMessage);

    await SimulateTyping(client, senderNumber, 2);
    await client.sendText(
      senderId,
      `Olá ${conversationState.senderName}!😊, Por favor digite o *NOME* produto que chamou sua atenção e deixe-me ajudá-lo a encontrá-lo!`
    );
  }

  async function handleProductName(message: Message) {
    conversationState.step = "breakingObjections";

    const {
      from: senderId,
      body: senderMessage,
      chatId: senderNumber,
    } = message;

    const productName = getProductName(senderMessage);

    if (productName) {
      conversationState.senderProductName = await productName;
      conversationState.senderProduct = await getProduct(
        conversationState.senderProductName
      );

      await client.sendText(
        senderId,
        `Olá ${conversationState.senderName}.Excelente escolha! o ${conversationState.senderProduct}`
      );
    }

    if (productName == null) {
      await client.sendText(
        senderId,
        `Desculpe ${conversationState.senderName}, não consegui identificar esse produto que você deseja. Por favor, escolha uma opção abaixo:`
      );
    }
  }

  async function handleBreakingObjections(message: Message) {
    const {
      from: senderId,
      body: senderMessage,
      chatId: senderNumber,
    } = message;
  }

  async function askNlpManagerConversation(message: Message) {
    const nlpResponse = await nlpManagerConversation(message.body);
    await client.sendText(message.from, nlpResponse);
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
