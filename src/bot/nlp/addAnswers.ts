import { NlpManager } from "node-nlp";

export function addAnswers(nlpManager: NlpManager) {
  // Adicione as respostas para o chatbot usando addAnswer
  nlpManager.addAnswer(
    "pt",
    "saudacao.oi",
    "Olá! Eu sou o chatbot da loja online X, como posso te ajudar hoje?"
  );
  nlpManager.addAnswer(
    "pt",
    "interesse.produto",
    "Com certeza! O produto X é incrível e pode ser útil para várias pessoas. Ele tem [característica 1] e [característica 2], além de proporcionar [benefício 1] e [benefício 2]. Você gostaria de saber mais sobre ele?"
  );
  nlpManager.addAnswer(
    "pt",
    "garantia.interesse",
    "Não se preocupe, oferecemos uma garantia de devolução do dinheiro em até [prazo de garantia] dias. Você pode comprar o produto X com tranquilidade!"
  );
  nlpManager.addAnswer(
    "pt",
    "preco.interesse",
    "O valor do produto X é de R$ [valor do produto]. Mas se você fizer sua compra agora, terá acesso exclusivo a um desconto especial de [porcentagem de desconto]% usando o código [código de desconto]."
  );
  nlpManager.addAnswer(
    "pt",
    "desconto.interesse",
    "Sim, temos um desconto especial de [porcentagem de desconto]% para quem comprar o produto X agora. Use o código [código de desconto] para obter o desconto!"
  );
  nlpManager.addAnswer(
    "pt",
    "compra.desconto",
    "Claro! Você pode comprar o produto X agora mesmo em nossa loja online usando o código [código de desconto] para obter [porcentagem de desconto]% de desconto. Não perca essa oportunidade!"
  );
}
