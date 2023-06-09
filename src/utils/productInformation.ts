import { products, IProduct } from "./products";

export async function getProductLink(productName) {
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
  
  for (const product of products) {
    for (const keyword of product.keywords) {
      if (message.toLowerCase().includes(keyword.toLowerCase())) {
        return product.name;
      }
    }
  }
  return null;
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
