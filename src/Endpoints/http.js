import axios from "axios";

export const http = axios.create({
  baseURL: "https://myproject-backend-6.onrender.com/api",
});