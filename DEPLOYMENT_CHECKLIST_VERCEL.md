Vercel Deployment Checklist — PulseCross

Prereqs
- Git repo created and pushed (GitHub/GitLab/Bitbucket)
- Postgres DB ready (Neon recommended)

1) Create a Neon Postgres database
- Sign up at https://neon.tech and create a project
- Create a pooled connection string (recommended for serverless)
- Copy the connection string (ensure it ends with sslmode=require)
  Example: postgres://user:pass@host/db?sslmode=require&pgbouncer=true&connect_timeout=30

2) Import repo into Vercel
- Vercel → New Project → Import your repository
- It will detect Next.js

3) Set environment variables (Project Settings → Environment Variables)
Required
- DATABASE_URL = postgres://…?sslmode=require&pgbouncer=true&connect_timeout=30
- NEXTAUTH_URL = https://your-project.vercel.app (or your custom domain)
- NEXTAUTH_SECRET = strong random (e.g., `openssl rand -base64 32`)

Optional
- NEXT_PUBLIC_BRAND_NAME = PulseCross
- STRIPE_SECRET_KEY, STRIPE_PRICE_ID, STRIPE_WEBHOOK_SECRET
- RESEND_API_KEY, NOTIFY_EMAIL
- PLAUSIBLE_DOMAIN
- GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GITHUB_ID, GITHUB_SECRET

4) Build configuration
- Environment variable PRISMA_SCHEMA_PATH is set in vercel.json to prisma/schema.postgres.prisma so Prisma Client is generated for Postgres during install.

- vercel.json sets buildCommand to `npm run build:vercel`
- That runs `prisma migrate deploy --schema=prisma/schema.postgres.prisma` then `next build`
- Alternatively, run migrations once locally:
  - export DATABASE_URL=postgres://…
  - npx prisma migrate deploy --schema=prisma/schema.postgres.prisma

5) First deployment
- Click Deploy in Vercel; wait for the build to finish
- You’ll get a preview URL like https://your-project.vercel.app

6) Create an admin user
- Visit https://your-project.vercel.app/auth/signup to create a user
- In Neon SQL editor, run:
  - UPDATE "User" SET role = 'ADMIN' WHERE email = 'your@email';
  (also available at prisma/sql/promote_admin.sql)
- Visit /admin to access the admin dashboard

7) Stripe (optional)
- Create a Product/Price in Stripe (test mode); set STRIPE_PRICE_ID
- Set STRIPE_SECRET_KEY (restricted test key) and STRIPE_WEBHOOK_SECRET
- In Stripe Dashboard → Developers → Webhooks → Add endpoint
  URL: https://your-project.vercel.app/api/stripe/webhook
  Events: invoice.paid, customer.subscription.created, checkout.session.completed

8) Plausible (optional)
- Set PLAUSIBLE_DOMAIN to your production domain

9) OAuth (optional)
- Create OAuth apps (Google/GitHub) with callback URL: https://your-project.vercel.app/api/auth/callback/<provider>
- Set the client IDs/secrets in Vercel env vars

10) Custom domain (optional)
- Vercel → Domains → Add your domain
- Follow DNS instructions, then update NEXTAUTH_URL to https://yourdomain.com

Troubleshooting
- Database connection: ensure `sslmode=require` and use pooled connections with `pgbouncer=true`
- Admin 403: ensure your user role is ADMIN in the DB
- Webhook 400: verify STRIPE_WEBHOOK_SECRET matches, and raw body is enabled (Next.js route handles this)
