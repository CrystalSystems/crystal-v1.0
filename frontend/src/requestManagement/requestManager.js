import axios from "axios";
import { BASE_URL } from "./baseURL";
export const requestManager = axios.create({
  withCredentials: true,
  baseURL: BASE_URL
});
