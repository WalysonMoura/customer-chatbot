import { create, Message, Whatsapp, CreateOptions } from "venom-bot";
import axios from "axios";

import { Conversation } from "./conversation";

export class WhatsAppBot {
  private client: Whatsapp;

  async start() {
    const options: CreateOptions = {
      session: "webhook-whatsapp",
      multidevice: true,
      autoClose: 0,
      // path: './data',
      // puppeteerOptions: { args: ["--no-sandbox"] }, // configurações do Puppeteer
    };

    this.client = await create(options);

    // Espera até que a sessão do WhatsApp esteja iniciada
    // await this.client.waitForLogin();

    this.client.onMessage(this.handleMessage);
    this.client.onIncomingCall(this.handleIncomingCall);

    process.on("SIGINT", () => {
      this.client.close();
    });
  }

  private handleMessage = async (message: Message) => {
    const senderNumber = message.chatId;

    const chats = await this.client.getChats();
    

    const myGroupChat = chats.find(
      (chat) => chat.name && chat.name.includes("Nome do meu grupo")
    );
    const groupId = myGroupChat && myGroupChat.id._serialized;

    console.log(groupId);

    if (!message.isGroupMsg) {
      switch (message.type) {
        case "chat":
          await this.handleChatMessage(senderNumber, message);
          break;
        case "ptt":
          await this.handleAudioMessage(senderNumber, message);
          break;
        default:
          break;
      }
    }
  };

  private handleChatMessage = async (
    senderNumber: string,
    message: Message
  ) => {
    await this.client.sendSeen(senderNumber);
    await Conversation(this.client, message);
  };

  private handleAudioMessage = async (
    senderNumber: string,
    message: Message
  ) => {
    await this.client.sendSeen(senderNumber);
    await this.client.sendText(
      message.from,
      "Só um instante, para eu ouvir o seu áudio😊!"
    );
  };

  private handleIncomingCall = async (call: any) => {
    this.client.sendText(
      call.peerJid,
      "Desculpe, não posso receber chamadas no momento"
    );
  };
}
