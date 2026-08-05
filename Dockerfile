# Stage 1: Build & dependencies
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Stage 2: Minimal runtime image
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app ./
COPY app.js ./

EXPOSE 8080
USER node
CMD ["node", "app.js"]