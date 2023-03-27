const SibApiV3Sdk = require('sib-api-v3-sdk');
const defaultClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization: api-key
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = 'YOUR_API_KEY';

const apiInstance = new SibApiV3Sdk.ContactsApi();

const createOrUpdateContact = async (name: string, phoneNumber: string) => {
  const contactsApi = new SibApiV3Sdk.ContactsApi();
  const contactEmail = '';
  const opts = {
    'email': contactEmail,
    'sms': phoneNumber,
  };

  try {
    const apiResponse = await contactsApi.getContactInfo(contactEmail, opts);
    const existingContactId = apiResponse.id;
    
    const updateContact = new SibApiV3Sdk.UpdateContact();
    updateContact.email = contactEmail;
    updateContact.sms = phoneNumber;
    updateContact.listIds = [2]; // adiciona contato a uma lista
    updateContact.tags = ['conversaram']; // adiciona tags ao contato

    if (existingContactId) {
      // atualiza contato se já existe
      await contactsApi.updateContact(existingContactId, updateContact);
    } else {
      // cria contato se não existe
      await contactsApi.createContact(updateContact);
    }
    console.log('Contato adicionado ou atualizado com sucesso!');
  } catch (err) {
    console.log(`Erro ao adicionar ou atualizar contato: ${err}`);
  }
};
