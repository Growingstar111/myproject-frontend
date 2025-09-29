import axios from "axios";

export const https = axios.create({
  baseURL: "https://myproject-backend-6.onrender.com/api",
});

https.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token;
    return config;
  }
});
