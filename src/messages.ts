/*

import { client } from './bot';
import { buttonTemplate } from './templates/buttonTemplate';
import { quickReplyTemplate } from './templates/quickReplyTemplate';

import { getGoogleDriveFile } from './googleDrive';

async function main() {
  const imageFileId = 'your-image-file-id';
  const audioFileId = 'your-audio-file-id';

  // Obter imagem do Google Drive
  const imageStream = await getGoogleDriveFile(imageFileId);
  // Fazer algo com a imagem...

  // Obter áudio do Google Drive
  const audioStream = await getGoogleDriveFile(audioFileId);
  // Fazer algo com o áudio...
}

main();



export const handleMessage = async (message: any) => {
  if (message.body === 'oi') {
    await client.sendText(message.from, 'Olá! Como posso ajudar?');
  } else if (message.body === 'comprar') {
    const product = {
      name: 'Produto X',
      price: 'R$ 99,99',
      image: 'https://example.com/product-x.jpg',
    };
    const message = buttonTemplate('Gostaria de comprar o Produto X?', [
      { label: 'Sim', value: `Sim, eu quero comprar o ${product.name}` },
      { label: 'Não', value: 'Não, obrigado' },
    ], product.image);
    await client.sendTemplate(message.from, message.template);
  } else if (message.body === 'ajuda') {
    const message = quickReplyTemplate('Qual é a sua dúvida?', [
      { label: 'Como faço um pedido?', value: 'pedido' },
      { label: 'Qual é o status do meu pedido?', value: 'status' },
      { label: 'Outra coisa', value: 'outra' },
    ]);
    await client.sendTemplate(message
*/