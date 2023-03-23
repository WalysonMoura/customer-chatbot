import { NlpManager } from "node-nlp";

const nlpManager = new NlpManager({ languages: ["pt"], forceNER: true });

await addDocuments(nlpManager);
await addAnswers(nlpManager);

export async function NlpManagerConversation(senderMessage: string) {
  await nlpManager.train();
  await nlpManager.save();
  
  const response = await nlpManager.process("pt", senderMessage.toLowerCase());
  return response.answer;
}
