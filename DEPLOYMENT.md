# Basma Vercel deployment

This repository contains three Vercel projects. Connect all three projects to the same GitHub repository and use the Root Directory shown below.

## 1. Backend

- Root Directory: `basma-backend`
- Framework: Express (auto-detected)
- Environment variables:
  - `ADMIN_EMAIL`
  - `ADMIN_PASSWORD`
  - `SESSION_SECRET` (a long random value)
  - `CORS_ORIGIN` (comma-separated website and dashboard production URLs)
- Storage: create and connect a **Private Vercel Blob** store. Vercel adds `BLOB_READ_WRITE_TOKEN` automatically.

Deploy the backend first and keep its production URL for the next projects.

## 2. Dashboard

- Root Directory: `basma-dashboard`
- Framework: Vite
- Environment variables:
  - `VITE_API_URL=https://your-backend.vercel.app`
  - `VITE_WEBSITE_URL=https://basma-company.vercel.app`

After the first deployment, add the dashboard production URL to the backend's `CORS_ORIGIN` and redeploy the backend.

## 3. Public website

- Root Directory: repository root (`.`)
- Framework: Vite
- Environment variable:
  - `VITE_API_URL=https://your-backend.vercel.app`

Redeploy after changing environment variables. Do not add backend secrets to either Vite project because every `VITE_` value is included in browser JavaScript.
