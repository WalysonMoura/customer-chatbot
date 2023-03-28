import { Whatsapp } from "venom-bot";


async function sendYesNoButtons(
  client: Whatsapp,
  senderNumber: string,
  question: string
): Promise<boolean> {
  // Cria os botões
  const buttons = [
    { id: 'yes', text: 'Sim' },
    { id: 'no', text: 'Não' },
  ];

  // Envia a mensagem com os botões
  await client.sendButtonsTemplate(senderNumber, question, buttons);

  // Aguarda a resposta do usuário
  const response = await client.waitForMessage(senderNumber);

  // Verifica qual botão foi clicado
  if (response?.body === 'Sim') {
    return true;
  } else {
    return false;
  }
}
