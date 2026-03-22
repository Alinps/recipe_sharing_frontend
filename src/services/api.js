import axios from "axios";

const API = import.meta.env.VITE_API_URL;

API.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }

  return config;
});

export default API;