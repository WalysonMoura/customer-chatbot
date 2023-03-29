import { NeuralNetwork } from "@nlpjs/neural";
import { NlpManager, ConversationContext } from "node-nlp";

import "./corpusProducts/corpus-produto1.json"
import "./corpusProducts/corpus-produto2.json"

import { addDocuments } from "./addDocuments";
import { addAnswers } from "./addAnswers";

const nlpManager = new NlpManager({
  languages: ["pt"],
  nlu: { useNeural: true },
  forceNER: true,
});


// Ajustando a taxa de aprendizagem e número máximo de épocas
nlpManager.addLanguage("pt");
nlpManager.settings.learningRate = 0.01;
nlpManager.settings.epochs = 500;

export async function nlpManagerConversation(senderMessage: string) {
  //await addDocuments(nlpManager);
 // await addAnswers(nlpManager);

  await nlpManager.loadCorpora([
    {
      locale: "pt",
      name: "produto1",
      sources: [{ filename: "corpus-produto1.json" }],
    },
    {
      locale: "pt",
      name: "produto2",
      sources: [{ filename: "corpus-produto2.json" }],
    },
  ]);
  await nlpManager.train();
  await nlpManager.save();

  const response = await nlpManager.process("pt", senderMessage.toLowerCase());
  return response.answer;
}
