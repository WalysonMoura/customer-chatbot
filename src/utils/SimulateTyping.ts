import { Whatsapp } from "venom-bot";

export async function SimulateTyping(client, remetenteNumber, durationSeconds) {
  await client.startTyping(remetenteNumber);
  await new Promise((resolve) => setTimeout(resolve, durationSeconds * 1000));
  await client.stopTyping(remetenteNumber);
}
