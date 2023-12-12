import axios from "axios";
import { getToken } from "./sessionHelper";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE,
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

export default instance;
