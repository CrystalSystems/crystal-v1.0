import axios from "axios";
import { baseURL } from "./baseURL";
export const requestManager = axios.create({
  withCredentials: true,
  baseURL: baseURL
});
requestManager.interceptors.request.use((config) => {
  config.headers.authorization = window.localStorage.getItem("token");
  return config;
});
