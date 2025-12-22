// Get the backend URL from environment variable or use relative path for local dev
// Local dev: VITE_API_URL=/api (proxied by Vite to localhost:8080)
// Production: VITE_API_URL=https://portfolio-backend-xxx.run.app/api
export const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const apiEndpoints = {
  skills: `${API_BASE_URL}/skills`,
  projects: `${API_BASE_URL}/projects`,
  askStefan: `${API_BASE_URL}/ask-stefan`,
  status: `${API_BASE_URL}/status`,
};
