# ---------- builder ----------
FROM node:20-alpine AS builder
WORKDIR /app

# 1) Dependencias
COPY package*.json ./
RUN npm ci

# 2) Config necesaria para el build de Nest
COPY nest-cli.json ./
COPY tsconfig.json ./
COPY tsconfig.build.json ./

# 3) Código + estáticos
COPY src ./src
COPY public ./public

# 4) Compilar (esto generará dist/ y dist/public)
RUN npm run build

# ---------- runner ----------
FROM node:20-alpine AS runner
WORKDIR /app

# Solo prod deps
COPY package*.json ./
RUN npm ci --omit=dev

# Copiá el build ya hecho
COPY --from=builder /app/dist ./dist

CMD ["node", "dist/main.js"]
