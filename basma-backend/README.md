# Basma Backend

Small Express API for editable Basma website content, dashboard media uploads, and contact form submissions.

## Run

```bash
cp .env.example .env
npm install
npm run dev
```

The API runs on `http://localhost:4000` by default.

## Main endpoints

- `GET /api/content` returns the editable website sections.
- `PUT /api/content` saves the editable website sections.
- `POST /api/media` uploads an image and returns a public `/uploads/...` URL.
- `POST /api/contact-submissions` receives public contact form data.
- `POST /api/auth/login` authenticates the single dashboard administrator.
- `GET /api/contact-submissions` lists dashboard contact submissions.
- `PATCH /api/contact-submissions/:id` updates a submission status.

## Authentication

Set `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and a long random `SESSION_SECRET` in `.env`. `POST /api/auth/login` returns an eight-hour signed session. Dashboard-only endpoints require that session as an `Authorization: Bearer ...` header.

The administrator password is never included in dashboard JavaScript or committed source files.

## Deploy to Vercel

1. Create a Vercel project from the repository and set its Root Directory to `basma-backend`.
2. Create a **Private Vercel Blob** store connected to the backend project. Vercel supplies `BLOB_READ_WRITE_TOKEN`.
3. Add `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `SESSION_SECRET`, and `CORS_ORIGIN` to Production and Preview environment variables.
4. Put the public website URL and dashboard URL in `CORS_ORIGIN`, separated by commas, and deploy.

When `BLOB_READ_WRITE_TOKEN` is present, editable content, contact submissions, and dashboard media use durable Blob storage. Local development continues to use `data/database.json` and `uploads/`.
