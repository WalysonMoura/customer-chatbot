import { Whatsapp, Chat } from "venom-bot";

type ISimulateRecordingAudio = {
  client: Whatsapp;
  remetenteId: string;
  durationSeconds: number;
};

export async function SimulateRecordingAudio({
  client,
  remetenteId,
  durationSeconds,
}: ISimulateRecordingAudio) {
  await client.setChatState(remetenteId, 1);
  await new Promise((resolve) => setTimeout(resolve, durationSeconds * 1000));
  await client.stopTyping(remetenteId);
}
//: Promise<void>
