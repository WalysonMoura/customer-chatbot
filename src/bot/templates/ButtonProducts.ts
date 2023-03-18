import { getAllProductsNames } from "../../utils/productInformation";


export async function getButtonProducts() {
  const productNames = await getAllProductsNames();
  return productNames.map((productName) => {
    return {
      "buttonText": {
        "displayText": productName,
      },
    };
  });
}




/*
// Cria um botão com uma imagem do Google Drive e a palavra "comprar"
const button = {
    image: {
      url: 'url-da-imagem-no-drive',
      filename: 'nome-da-imagem',
      caption: 'comprar',
    },
    type: 'button',
    reply: 'Obrigado pela compra!',
  };
  
  // Envia a mensagem com o botão para o cliente
  const message = {
    to: 'NUMERO_DO_CLIENTE@c.us',
    content: 'Ol


    import { create } from 'venom-bot';

async function start() {
  const client = await create();

  const button = {
    text: 'Comprar',
    image: 'https://exemplo.com/imagem-produto.jpg',
    url: 'https://exemplo.com/comprar-produto'
  };

  await client.sendButtons('55XXXXXXXXX@c.us', 'Clique no botão para comprar o produto:', [button]);
}

start();
*/
