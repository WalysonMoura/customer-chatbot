import { Whatsapp } from "venom-bot";

export async function sendPurchaseButtons(
  client: Whatsapp,
  senderNumber,
  productName,
  imageProduct,
  productLink
): Promise<void> {
  const message = {
    thumbnail: imageProduct,
    buttons: [
      {
        buttonUrl: productLink,
        buttonText: "Conheça já!",
      },
    ],
  };

  await client.sendButtonsTemplate(
    senderNumber,
    `${productName}`,
    message.buttons,
    "",
    message.thumbnail
  );
}
