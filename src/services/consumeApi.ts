import { baseUrl } from "$lib/conf";
import axios, { type InternalAxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
