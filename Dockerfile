FROM node:20-alpine AS builder
WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ ./
RUN npm run build

FROM node:20-alpine
WORKDIR /app/backend

COPY backend/package*.json ./
RUN npm install --production

COPY backend/ ./
COPY --from=builder /app/frontend/dist ./public

EXPOSE 3000
CMD ["node", "server.js"]