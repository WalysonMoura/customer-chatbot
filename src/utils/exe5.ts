import axios from 'axios';

const sendinblueAPIKey = 'YOUR_SENDINBLUE_API_KEY';

// Define o número de telefone e o nome do cliente
const phoneNumber = '1234567890';
const name = 'John Doe';

// Define a URL base da API do Sendinblue
const baseURL = 'https://api.sendinblue.com/v3';

// Define as configurações da requisição, incluindo o cabeçalho de autorização
const config = {
  baseURL: baseURL,
  headers: {
    'api-key': sendinblueAPIKey,
    'Content-Type': 'application/json'
  }
};

// Cria um objeto para a requisição da informação do contato
const getContactInfoRequest = axios.get(`/contacts/${phoneNumber}`, config);

// Cria um objeto para a requisição de adição de tags ao contato
const addTagsRequest = axios.post(`/contacts/${phoneNumber}/lists`, {listIds: [2]}, config);

// Define uma função para atualizar as informações do contato
const updateContactInfo = async () => {
  try {
    // Envia a requisição para a API do Sendinblue para buscar informações do contato
    const response = await getContactInfoRequest;

    // Obtém a primeira resposta da lista de contatos
    const existingContact = response.data.contacts[0];

    if (existingContact) {
      // Se o contato já existe, atualiza as informações
      const updateContact = {
        attributes: {
          'NOME': name
        }
      };

      // Envia a requisição para a API do Sendinblue para atualizar as informações do contato
      const updateResponse = await axios.put(`/contacts/${existingContact.id}`, updateContact, config);

      console.log('Contato atualizado com sucesso!');
    } else {
      // Se o contato não existe, cria um novo
      const createContact = {
        emailBlacklisted: true,
        smsBlacklisted: false,
        listIds: [1],
        attributes: {
          'NOME': name,
          'sms': phoneNumber
        }
      };

      // Envia a requisição para a API do Sendinblue para criar o novo contato
      const createResponse = await axios.post('/contacts', createContact, config);

      console.log('Contato criado com sucesso!');
    }
  } catch (error) {
    console.error('Erro ao buscar/atualizar informações do contato:', error);
  }
};

// Define uma função para adicionar tags ao contato
const addTags = async () => {
  try {
    // Envia a requisição para a API do Sendinblue para adicionar as tags ao contato
    const response = await addTagsRequest;

    console.log('Tags adicionadas com sucesso!');
  } catch (error) {
    console.error('Erro ao adicionar tags:', error);
  }
};

//
