import axios from "axios";
console.log("API URL:", import.meta.env.VITE_API_URL);
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.request.use((config) => {

  const userToken = localStorage.getItem("token");
  const adminToken = localStorage.getItem("adminToken");
  const isAuthFreeRoute = config.url.includes("/signup") || config.url.includes("/login");
  const isAdminRoute = config.url.includes("/user_admin");
  const tokenToUse = isAdminRoute ? adminToken : userToken;

  if (tokenToUse && !isAuthFreeRoute) {
    config.headers.Authorization = `Token ${tokenToUse}`;
  }

  return config;
});

export default API;
