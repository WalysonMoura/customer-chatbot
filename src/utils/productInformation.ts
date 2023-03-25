import { products } from "./products";

function getProductLink(productName) {
  // Encontrar o objeto do produto com o nome correto
  const product = products.find(
    (product) => product.name.toLowerCase() === productName.toLowerCase()
  );

  // Se o produto for encontrado, retornar a URL da imagem correspondente
  if (product) {
    return product.link;
  }

  // Se o produto não for encontrado, retornar uma mensagem de erro
  return "Desculpe, não encontramos nenhum produto com esse nome.";
}

export async function getProductName(message) {
  for (let i = 0; i < products.length; i++) {
    const keywords = products[i].keywords;
    for (let j = 0; j < keywords.length; j++) {
      if (message.includes(keywords[j])) {
        return products[i].name;
      }
    }
  }
  return null; // retorna null se nenhum produto for encontrado
}

export async function getAllProductsNames() {
  const productNames = [];
  for (let i = 0; i < products.length; i++) {
    productNames.push(products[i].name);
  }
  return productNames;
}

export async function getProduct(nome) {
  for (let i = 0; i < products.length; i++) {
    if (products[i].name.toLowerCase() === nome.toLowerCase()) {
      return products[i];
    }
  }
  return null; // caso não encontre o produto, retorna null
}
