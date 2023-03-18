import { Chat, Message } from "venom-bot";

interface Product {
  image: string;
}

class PurchaseButtonTemplate {
  private chat: Chat;

  constructor(chat: Chat) {
    this.chat = chat;
  }

  async showProductButton(product: Product): Promise<void> {

    const button = {
      buttonText: {
        displayText: "Comprar",
      },
      type: 1,
      // URL da imagem salva no Google Drive
      image: {
        link: "https://drive.google.com/file/d/1EwU6pAnJ1Aa4-aTk4W8yE4GAbhNlLgJN/view?usp=sharing",
      },
      // URL de redirecionamento após o botão ser pressionado
      openLink: {
        url: "https://minhaloja.com/produto1",
      },
    };

    const message: Message = {
      chatId: this.chat.id,
      buttons: buttons,
    };

    await this.chat.sendButtons(message);
  }
}

export { PurchaseButtonTemplate };
