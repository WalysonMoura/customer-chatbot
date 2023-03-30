import { NeuralNetwork } from "@nlpjs/neural";
import { NlpManager, ConversationContext } from "node-nlp";


import { addDocuments } from "./addDocuments";
import { addAnswers } from "./addAnswers";

const corpus1 = path.resolve(__dirname, './corpusProducts/corpus-produto1.json');
const corpus2 = path.resolve(__dirname, './corpusProducts/corpus-produto2.json');


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

 await nlpManager.addCorpus('./corpusProducts/corpus-produto1.json');
 await nlpManager.addCorpus('./corpusProducts/corpus-produto2.json');
 /*
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
  */
  await nlpManager.train();
  await nlpManager.save();

  const response = await nlpManager.process("pt", senderMessage.toLowerCase());
  return response.answer;
}
