import { ContactsApi, CreateContact, GetContacts } from 'sib-api-v3-typescript';

const contactsApi = new ContactsApi();
const apiKey = contactsApi.authentications['apiKey'];
apiKey.apiKey = 'YOUR_API_KEY';

async function createOrUpdateContact(name: string, number: string) {
  const formattedNumber = number.replace('@c.us', '');
  const listId = 2; // ID da lista de contatos no Sendinblue
  
  // Verificar se o contato já existe
  const existingContacts: GetContacts = await contactsApi.getContacts(undefined, undefined, undefined, formattedNumber);
  
  if (existingContacts.count > 0) {
    // O contato já existe, atualizar informações
    const contactId = existingContacts.contacts[0].id;
    const updateContact = new CreateContact();
    updateContact.email = existingContacts.contacts[0].email;
    updateContact.listIds = existingContacts.contacts[0].listIds;
    updateContact.attributes = {
      sms: formattedNumber,
      name: name,
    };
    await contactsApi.updateContact(contactId, updateContact);
  } else {
    // O contato não existe, criar novo contato
    const newContact = new CreateContact();
    newContact.email = '';
    newContact.listIds = [listId];
    newContact.attributes = {
      sms: formattedNumber,
      name: name,
    };
    await contactsApi.createContact(newContact);
  }
}
