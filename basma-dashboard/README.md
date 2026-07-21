# Basma Dashboard

Admin dashboard for editing the Basma backend sections and reviewing contact form submissions.

## Run

```bash
cp .env.example .env
npm install
npm run dev
```

The dashboard runs on `http://localhost:5174` by default and expects the backend at `http://localhost:4000`.

Sign in with the single administrator account configured through the backend's `ADMIN_EMAIL` and `ADMIN_PASSWORD` environment variables. The session is stored in the browser tab and expires after eight hours.

## Deploy to Vercel

Create a Vercel project from the repository and set its Root Directory to `basma-dashboard`. Add `VITE_API_URL` with the production backend URL and `VITE_WEBSITE_URL` with the public website URL (both without a trailing slash) to Production and Preview, then deploy.
