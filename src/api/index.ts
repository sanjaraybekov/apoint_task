import axios from "axios";
import { getToken } from "../helpers/utils";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_HOST,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      localStorage.removeItem("token");
      window.location.replace("/");
    }

    return Promise.reject(error);
  }
);

export default api;
