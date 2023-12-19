import axios, { AxiosInstance } from "axios";
import { getToken } from "./sessionHelper";

const instance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE as string,
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

export default instance;
