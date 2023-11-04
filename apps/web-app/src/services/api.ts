import axios from "axios";
import config from "../config";

export const backendApi = axios.create({
  withCredentials: true,
  baseURL: config.API_HOST,
});
