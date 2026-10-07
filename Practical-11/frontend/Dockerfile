# Stage 1: Build Frontend Assets
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the Built Application
FROM node:18-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
RUN npm install --omit=dev vite
EXPOSE 5173

# Run Vite preview on all interfaces
CMD ["npx", "vite", "preview", "--host", "0.0.0.0", "--port", "5173"]
