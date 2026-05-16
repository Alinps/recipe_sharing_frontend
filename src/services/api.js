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

API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const data = error?.response?.data;
    const requestUrl = error?.config?.url || "";
    const isAdminRoute = requestUrl.includes("/user_admin");

    const rawMessage =
      (typeof data?.error === "string" && data.error) ||
      (typeof data?.detail === "string" && data.detail) ||
      "";
    const normalizedMessage = rawMessage.toLowerCase();
    const isInvalidTokenMessage = normalizedMessage.includes("invalid token");

    if (status === 401 || isInvalidTokenMessage) {
      if (isAdminRoute) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("admin");
        if (window.location.pathname !== "/admin_login") {
          window.location.replace("/admin_login");
        }
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        if (window.location.pathname !== "/login") {
          window.location.replace("/login");
        }
      }
    }

    return Promise.reject(error);
  }
);

export default API;
