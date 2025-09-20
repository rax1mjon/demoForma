import axios from "axios";
import { ENDPOINT } from "../constants";

export const requies = axios.create({
  baseURL: `${ENDPOINT}/api`,
  timeout: 10000,
});
