import axios from "axios";
console.log("API URL:", import.meta.env.VITE_API_URL);
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  if (token && !config.url.includes("/signup") && !config.url.includes("/login")) {
    config.headers.Authorization = `Token ${token}`;
  }

  return config;
});

export default API;