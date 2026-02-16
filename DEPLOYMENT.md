# Deployment Configuration

## Overview

This project uses separate Cloud Run services for frontend and backend.

## Environment Variables

### Frontend

- `VITE_BACKEND_URL` - URL of the backend Cloud Run service (set during build)

### Backend

- `PORT` - Server port (automatically set by Cloud Run to 8080)
- `GOOGLE_CLOUD_PROJECT` - Your GCP project ID
- Other env vars for Vertex AI, etc.

## Local Development

1. **Backend:**

   ```bash
   cd backend
   npm install
   npm run dev
   ```

   Runs on http://localhost:8080

2. **Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Runs on http://localhost:5173
   - Vite proxy forwards `/api/*` requests to `http://localhost:8080`

## Production Deployment

The `cloudbuild.yaml` handles the full deployment:

1. **Builds & deploys backend** first
2. **Gets the backend URL** from Cloud Run
3. **Builds frontend** with `VITE_BACKEND_URL` build arg
4. **Deploys frontend** to Cloud Run

### Manual Deploy

```bash
gcloud builds submit --config=cloudbuild.yaml
```

## API Configuration

All API endpoints are centralized in [`frontend/src/config/api.ts`](frontend/src/config/api.ts):

```typescript
export const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || '';
export const apiEndpoints = {
  skills: `${API_BASE_URL}/api/skills`,
  projects: `${API_BASE_URL}/api/projects`,
  askStefan: `${API_BASE_URL}/api/ask-stefan`,
};
```

- **Local dev**: `VITE_BACKEND_URL` is empty, uses Vite proxy
- **Production**: `VITE_BACKEND_URL` points to backend Cloud Run URL
