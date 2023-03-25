export const MenuButtons = [
  {
    buttonText: {
      displayText: "Sim",
    },
    type: 'reply',
    reply: {
      title: "Você escolheu SIM",
      text: "Muito obrigado!",
    }
  },
  {
    buttonText: {
      displayText: "Não",
    },
    type: 'reply',
    reply: {
      title: "Você escolheu NÃO",
      text: "Que pena! O que podemos fazer para melhorar?",
    }
  },
];
/*
  {
    "buttonText": {
      "displayText": "Quero conhecer mais sobre um Produto!",
    },
    "type": "message",
    "messageText": "produto"
  },
  {
    "buttonText": {
      "displayText": "Quero tirar uma Dúvida!😊",
    },
    "type": "message",
    "messageText": "duvida"
  }
];

  export const MenuButtons = {
    "contentText": "Você gostaria de receber mais informações?",
      "footerText": "Responda com um dos botões abaixo",
      "buttons": buttons,
  }



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
*/
