//import { NlpManager } from "@nlpjs/nlp";
import { NeuralNetwork } from "@nlpjs/neural";

const { NlpManager } = require("@nlpjs/nlp");

import { addDocuments } from "./addDocuments";
import { addAnswers } from "./addAnswers";

const nlpManager = new NlpManager({
  languages: ["pt"],
  nlu: { useNeural: true },
  forceNER: true,
});

export async function nlpManagerConversation(senderMessage: string) {
  await addDocuments(nlpManager);
  await addAnswers(nlpManager);

  await nlpManager.train();
  await nlpManager.save();

  const response = await nlpManager.process("pt", senderMessage.toLowerCase());
  return response.answer;
}
