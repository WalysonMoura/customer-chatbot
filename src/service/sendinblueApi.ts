import axios from "axios";

const sendinblueApi = axios.create({
  baseURL: "https://api.sendinblue.com/v3/",
});

export default sendinblueApi;