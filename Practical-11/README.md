# Practical 11: Containerization with Docker and Docker Compose

## Objective
To containerize the full-stack Task Management application using Docker and orchestrate multi-container services using Docker Compose.

## Architecture
```
docker-compose.yml
 ├── frontend (React 18 multi-stage build, port 5173)
 ├── backend  (Node/Express API, port 5000)
 └── mongodb  (Official MongoDB 7.0 image with persistent volume, port 27017)

Network: app-network (internal bridge network)
Flow: frontend (5173) ──► backend (5000) ──► mongodb:27017
All services start concurrently with: docker-compose up --build
```

## Implementation Highlights
1. **Multi-Stage React Dockerfile (`frontend/Dockerfile`)**:
   - First stage builds static minified bundles with Vite.
   - Second stage serves artifacts, slashing Docker image size.
2. **Backend Dockerfile (`backend/Dockerfile`)**:
   - Alpine Node.js 18 container with isolated dependencies and runtime script.
3. **Docker Compose Orchestration (`docker-compose.yml`)**:
   - Defines `frontend`, `backend`, and `mongodb` under a single bridge network (`app-network`).
   - Uses container service naming resolution (`mongodb://mongodb:27017/taskdb`).
   - Declares named volume `mongo-data` ensuring database persistence across container teardowns.
4. **Build Context Optimization (`.dockerignore`)**:
   - Excludes local `node_modules`, `.env`, and git artifacts.

## How to Run
Ensure Docker Desktop or Docker Engine is running on your machine:

1. **Start the entire multi-container stack with one command**:
   ```bash
   cd Practical-11
   docker-compose up --build
   ```

2. **Verify running containers**:
   ```bash
   docker ps
   ```
   You should see 3 running containers: `task_frontend`, `task_backend`, and `task_mongodb`.

3. **Access the application**:
   - Frontend UI: `http://localhost:5173`
   - Backend API: `http://localhost:5000/tasks`
   - MongoDB: `localhost:27017`

4. **Stop the stack**:
   ```bash
   docker-compose down
   ```
