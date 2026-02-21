import axios from "axios";
import keycloak from "../keycloak";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE, // from docker-compose: http://localhost:8000
});

// Attach token to every request
http.interceptors.request.use((config) => {
  const token = keycloak.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Redirect to /pending on 403
http.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status;
    const detail = err?.response?.data?.detail;

    // If backend blocks actions because not verified
    if (status === 403 && typeof detail === "string" && detail.toLowerCase().includes("verification")) {
      window.location.href = "/pending";
      return; // stop here
    }

    return Promise.reject(err);
  }
);

export default http;