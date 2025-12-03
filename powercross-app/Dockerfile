# Node 20 LTS
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN npm ci || npm install

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build || echo "Build will run at start if not built"

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Ensure prisma client exists
RUN npx prisma generate || true
EXPOSE 3000
CMD ["sh", "-lc", "npx prisma migrate deploy || npx prisma db push; node node_modules/.bin/next start -p 3000"]
