import { Chat, Message } from "venom-bot";

class YesNoButtonsTemplate {
  private chat: Chat;

  constructor(chat: Chat) {
    this.chat = chat;
  }

  async askYesNoQuestion(question: string): Promise<boolean> {
    const buttons = [
      { button: "Sim", hide: false },
      { button: "Não", hide: false },
    ];

    const message: Message = {
      body: question,
      chatId: this.chat.id,
      buttons: buttons,
    };

    const result = await this.chat.sendButtons(message);

    return result.text === "Sim";
  }
}

export { YesNoButtonsTemplate };
