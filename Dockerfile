# syntax=docker/dockerfile:1

# ---------- deps: instala dependências ----------
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---------- builder: compila o Next ----------
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ---------- runner: imagem final enxuta ----------
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# arquivos do build standalone
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# diretórios graváveis pela área administrativa (dados + uploads).
# Sem volume: ficam aqui (efêmeros). Com volume Railway: aponte DATA_DIR para o
# mountPath (ex.: DATA_DIR=/data) que o app grava em <DATA_DIR>/content e /uploads.
RUN mkdir -p /app/content /app/uploads

# Roda como root para evitar problemas de permissão em volumes montados.
EXPOSE 3000
CMD ["node", "server.js"]
