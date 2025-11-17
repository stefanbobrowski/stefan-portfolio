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

# Copy only prod deps
COPY package*.json ./
RUN npm ci --omit=dev

# Copy compiled frontend
COPY --from=builder /app/dist ./dist

# Copy server
COPY --from=builder /app/server.js ./server.js

EXPOSE 8080

CMD ["node", "server.js"]
