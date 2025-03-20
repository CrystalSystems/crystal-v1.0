import axios from "axios";
import { baseURL } from "./baseURL";
export const requestManager = axios.create({
  withCredentials: true,
  baseURL: baseURL
});
