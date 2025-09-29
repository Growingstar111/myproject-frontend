import axios from "axios";

export const https = axios.create({
  baseURL: "http://localhost:5000/api",
});

https.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token;
    return config;
  }
});
