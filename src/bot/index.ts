/*
import { create, Message, Whatsapp, CreateOptions } from "venom-bot";
import axios from "axios";

import  Conversation  from "./conversation";

export class WhatsAppBot {
  private client: Whatsapp;

  async start() {
    const options: CreateOptions = {
      session: "webhook-whatsapp",
      multidevice: true,
      // path: './data',
      // puppeteerOptions: { args: ["--no-sandbox"] }, // configurações do Puppeteer
    };

    this.client = await create(options);

    // Espera até que a sessão do WhatsApp esteja iniciada
   // await this.client.waitForLogin();

    this.client.onMessage(this.handleMessage);
    //this.client.onIncomingCall(this.handleIncomingCall);

    // Finaliza a sessão do WhatsApp
    // await this.client.close();
  }

  private handleMessage = async (message: Message) => {
    const senderNumber = message.from;

    if (!message.isGroupMsg) {
      switch (message.type) {
        case "chat":
          await this.handleChatMessage(senderNumber, message);
          break;
        case "audio":
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
}
*/

import { create, Message, Whatsapp, CreateOptions } from "venom-bot";
import axios from "axios";

import { Conversation } from "./conversation";

export class WhatsAppBot {
  private client: Whatsapp;

  async start() {
    const options: CreateOptions = {
      session: "webhook-whatsapp",
      multidevice: true,
      // path: './data',
      // puppeteerOptions: { args: ["--no-sandbox"] }, // configurações do Puppeteer
    };

    //const client: Whatsapp = await create(options);
    this.client = await create(options);

    // Espera até que a sessão do WhatsApp esteja iniciada
    // await this.client.waitForLogin();

    this.client.onMessage(this.handleMessage);
    this.client.onIncomingCall(this.handleIncomingCall);

    // Finaliza a sessão do WhatsApp
    // await this.client.close();

    // Finaliza a sessão do WhatsApp
    // await client.close();
  }

  private handleMessage = async (message: Message) => {
    const senderNumber = message.chatId;

    if (!message.isGroupMsg) {
      switch (message.type) {
        case "chat":
          await this.handleChatMessage(senderNumber, message);
          break;
        case "audio":
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

/*

let conversationState: Promise<0 | 1 | 2 | 3 | 4> = Promise.resolve(0);

    client.onMessage(async (message: Message) => {
      if (message.type === "chat" && !message.isGroupMsg) {
        switch (await conversationState) {
          case 0:
            await Conversation(client, message);
            conversationState = Promise.resolve(1);
            break;

          case 1:
            await Conversation(client, message);
            conversationState = Promise.resolve(2);
            break;

          case 2:
            await Conversation(client, message);
            conversationState = Promise.resolve(3);
            break;

          case 3:
            await Conversation(client, message);
            conversationState = Promise.resolve(4);
            break;

          default:
            await client.sendText(message.from, "Desculpe, não entendi.");
            conversationState = Promise.resolve(0);
            break;
        }
      }
    });







client.onMessage(async (message: Message) => {
      const remetenteNumber = message.chatId;

      if (!message.isGroupMsg) {
        if (message.type === "chat") {
          const conversation = new Conversation(client, message);
          await conversation.start();
          await client.sendSeen(remetenteNumber);
          // await Conversation(client, message);
        }

        if (message.type === "audio") {
          await client.sendSeen(remetenteNumber);
          client.sendText(
            message.from,
            "Só um instante, para eu ouvir o seu áudio😊!"
          );
        }
      }
    });

    client.onIncomingCall((call: any) => {
      client.sendText(
        call.peerJid,
        "Desculpe, não posso receber chamadas no momento"
      );
    });


        client.onMessage(async (messageName: Message) => {
            await client.sendSeen(remetenteNumber);
            await Conversation(client, messageName);

            client.onMessage(async (productNameMessage: Message) => {
              await client.sendSeen(remetenteNumber);
              await Conversation(client, productNameMessage);

              client.onMessage(async (messageBreakingObjections: Message) => {
                await client.sendSeen(remetenteNumber);
                await Conversation(client, messageBreakingObjections);
              });

              client.onMessage(async (messageDoubt: Message) => {
                await client.sendSeen(remetenteNumber);
                await Conversation(client, messageDoubt);
              });
            });
          });

*/
