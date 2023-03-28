import axios, { AxiosInstance } from "axios";

const sendinblueApi: AxiosInstance = axios.create({
  baseURL: "https://api.sendinblue.com/v3/",
});

export default sendinblueApi;

