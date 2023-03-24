
  export const MenuButtons = [
    {
      "buttonId": "1",
      "buttonText": {
        "displayText": "Quero conhecer mais sobre um Produto!"
        }
      },
    {
      "buttonId": "2",
      "buttonText": {
        "displayText": "Quero tirar uma Dúvida!😊"
        }
      }
    ]


 
    const buttons = [
      {
        "buttonText": {
          "displayText": "Sim",
        },
        "type": "message",
        "messageText": "O cliente escolheu sim"
      },
      {
        "buttonText": {
          "displayText": "Não",
        },
        "type": "message",
        "messageText": "O cliente escolheu não"
      }
    ];
    const buttonMessage = {
      "contentText": "Você gostaria de receber mais informações?",
      "footerText": "Responda com um dos botões abaixo",
      "buttons": buttons,
    };
    await client.sendButtons(message.from, buttonMessage);

   