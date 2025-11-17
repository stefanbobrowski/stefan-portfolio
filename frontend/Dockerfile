# ---------------------------
# 1. Build stage
# ---------------------------
FROM node:22 AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---------------------------
# 2. Run stage
# ---------------------------
FROM node:22

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.js .

EXPOSE 8080

CMD ["node", "server.js"]
