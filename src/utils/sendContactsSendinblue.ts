import axios from "axios";
import sendinblueApi from "../service/sendinblueApi";
/*
import {
  Client,
  Configuration,
  DefaultApi,
  CreateContact,
  ContactsApi,
  UpdateContact,
  CreateContactAttributes,
} from "@sendinblue/client";
*/

const sendinblueAPIKey = process.env.SENDINBLUE_API_KEY;

const sendinblueApiConfig = {
  baseURL: sendinblueApi,
  headers: {
    "api-key": sendinblueAPIKey,
    "Content-Type": "application/json",
  },
};

export function sendContactsSendinblue(
  senderName: string,
  senderNumber: string,
  senderProductName: string
) {
  const cleanedPhoneNumber = await senderNumber.replace(/[^0-9]/g, "");
  const formattedPhoneNumber = `+55${cleanedPhoneNumber}`;

  try {
    const contactExists = await checkContactExisting(formattedPhoneNumber);
    if (!contactExists) {
      await addNewContact(senderName, formattedPhoneNumber, senderProductName);
    } else {
      await updateContactTag(formattedPhoneNumber);
    }
  } catch (error) {
    console.error("Erro ao buscar/atualizar informações do contato:", error);
  }
}

function checkContactExisting(senderNumber: string) {
  try {
    const getContactInfoRequest = await axios.get(
      `/contacts/${senderNumber}`,
      sendinblueApiConfig
    );

    if (getContactInfoRequest.status === 200) {
      return true;
    }

    return false;
  } catch (error) {
    // erro ao buscar informações do contato
    console.error("Erro ao buscar informações do contato:", error);
    return false;
  }
}

function addNewContact(senderName, senderNumber, senderProductName) {
  const productName = senderProductName.replace(/\s+/g, "-");
  const tags = ["novo-cliente", productName];
  const listIds = [1];

  const newContact = {
    attributes: {
      NOME: senderName,
      sms: senderNumber,
    },
    emailBlacklisted: false,
    smsBlacklisted: false,
    listIds: listIds,
    updateEnabled: true,
    tags: tags,
  };

  const createNewContact = axios.post(
    `/contacts/`,
    newContact,
    sendinblueApiConfig
  );
}

async function updateContactTag(senderNumber: string) {
  try {
    // Verificar se o contato já possui a tag "novo-cliente"
    const response = await axios.get(
      `/contacts/${senderNumber}`,
      sendinblueApiConfig
    );
    const existingTags = response.data.tags || [];
    const hasNewClientTag = existingTags.some(
      (tag) => tag.name === "novo-cliente"
    );

    // Se tiver a tag "novo-cliente", atualizar para "cliente-morno"
    if (hasNewClientTag) {
      const contactId = response.data.id;
      const updatedContact = {
        attributes: {},
        listIds: [],
        updateEnabled: true,
        tags: [{ name: "cliente-morno", ...existingTags }],
      };

      await axios.put(
        `/contacts/${contactId}`,
        updatedContact,
        sendinblueApiConfig
      );
    }
  } catch (error) {
    console.error("Erro ao atualizar informações do contato:", error);
  }
}
