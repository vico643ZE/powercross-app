Powercross — Commercial-ready Next.js Starter\n\nWhat’s included\n- Next.js 14 (App Router) + TypeScript + Tailwind CSS\n- Auth: NextAuth (credentials + Google/GitHub optional)\n- DB: Prisma + SQLite (local). Easy switch to Postgres later.\n- CMS: Pages + Blog (markdown/html stored) with simple admin CRUD\n- Leads: Lead capture API + component\n- Payments: Stripe Checkout (subscription) scaffolding + webhook route\n- Analytics: Plausible script hook\n\nLocal setup\n1) Install deps\n   npm install\n2) Copy env\n   cp .env.example .env\n   Open .env and fill values (use Stripe test keys).\n3) Init DB\n   npx prisma migrate dev --name init\n4) Run\n   npm run dev\n5) Visit\n   http://localhost:3000\n\nAdmin access\n- Create an account at /auth/signup then sign in.\n- To make yourself admin, update the user role in the DB via Prisma Studio:\n  npx prisma studio (set role to ADMIN)\n- Admin area lives at /admin (protected by middleware).\n\nStripe (test mode)\n- Add STRIPE_SECRET_KEY and STRIPE_PRICE_ID in .env\n- Start dev server and create a Checkout session via /api/checkout (or wire a button).\n- Configure a webhook endpoint to /api/stripe/webhook with your STRIPE_WEBHOOK_SECRET.\n\nCMS\n- Pages: create via Admin -> Pages. They render at /{slug}.\n- Blog: posts render at /blog/{slug}.\n\nBranding
- Update tailwind.config.ts brand colors and NEXT_PUBLIC_BRAND_NAME in .env.
- Replace favicon at public/favicon.svg or add public/favicon.ico.
\n\nDeploy to production
Option A — Vercel + Neon (Postgres)
1) Create a Neon Postgres project; copy the connection string.
2) Push this repo to GitHub/GitLab/Bitbucket and import it in Vercel.
3) In Vercel Project Settings → Environment Variables, add:
   - DATABASE_URL=<your Neon connection string>
   - NEXTAUTH_URL=https://your-project.vercel.app (or custom domain)
   - NEXTAUTH_SECRET=<strong random>
   - STRIPE_SECRET_KEY, STRIPE_PRICE_ID, STRIPE_WEBHOOK_SECRET (optional)
   - RESEND_API_KEY, NOTIFY_EMAIL (optional)
   - PLAUSIBLE_DOMAIN=your-domain.com (optional)
4) Build settings: either keep defaults and set Build Command to `npm run build:vercel` in vercel.json (already included), or set it in the dashboard.
5) Run migrations once: locally run `npx prisma migrate deploy --schema=prisma/schema.postgres.prisma` using the same DATABASE_URL, or use Vercel CLI `vercel env pull` + a one-off `migrate deploy` job.
6) Deploy. You’ll get a URL like https://your-project.vercel.app

Option B — Any Node host
- Provide the same env vars; run `npm ci && npm run build && npx prisma migrate deploy && npm start`.

Docker local dev
- Build: docker compose build
- Run: docker compose up
- App: http://localhost:3000
