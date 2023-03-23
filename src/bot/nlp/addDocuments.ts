import { NlpManager } from "node-nlp";

export function addDocuments(nlpManager: NlpManager) {
  // Adiciona os documentos de treinamento
  nlpManager.addDocument("pt", "Oi", "saudacao.oi");
  nlpManager.addDocument("pt", "Olá", "saudacao.oi");
  nlpManager.addDocument("pt", "Oi, tudo bem?", "saudacao.oi");
  nlpManager.addDocument("pt", "Olá, como você está?", "saudacao.oi");
  nlpManager.addDocument(
    "pt",
    "Queria saber mais sobre o produto",
    "interesse.produto"
  );
  nlpManager.addDocument("pt", "Me fala sobre o produto", "interesse.produto");
  nlpManager.addDocument(
    "pt",
    "Qual o produto que vocês vendem?",
    "interesse.produto"
  );
  nlpManager.addDocument("pt", "Eu quero comprar", "compra.interesse");
  nlpManager.addDocument(
    "pt",
    "Quero saber mais sobre a garantia",
    "garantia.interesse"
  );
  nlpManager.addDocument(
    "pt",
    "E se eu não gostar do produto?",
    "garantia.interesse"
  );
  nlpManager.addDocument("pt", "Qual o valor do produto?", "preco.interesse");
  nlpManager.addDocument(
    "pt",
    "Tem algum desconto disponível?",
    "desconto.interesse"
  );
  nlpManager.addDocument("pt", "Quero o desconto", "compra.desconto");
}
