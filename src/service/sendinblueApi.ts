import axios from "axios";

const api = axios.create({
  baseURL: "https://api.sendinblue.com/v3/contacts",
});

export default api;