# Advanced Web Development Frameworks (ITUE301) - Complete Practical Portfolio

This repository contains the complete implementation of **all 13 Practicals** for the 5th Semester B.Tech Information Technology curriculum at Charotar University of Science and Technology (CSPIT - IT), based on [AWDF_PL.pdf](file:///D:/SEM-5/awdf/AWDF_PL.pdf).

---

## 📁 Complete Directory Index & Architectural Progression

Every practical carries forward the foundation of previous practicals in a continuous full-stack progression:

| Practical | Module Title | Tech Stack | Carried Forward From | Core Deliverables |
| :--- | :--- | :--- | :--- | :--- |
| [**Practical-01**](file:///D:/SEM-5/awdf/Practical-01) | React Setup & Component Architecture | Vite, React 18+ | Baseline | Reusable components (`Header`, `About`, `Skills`, `Footer`), props passing, dynamic skill array rendering. |
| [**Practical-02**](file:///D:/SEM-5/awdf/Practical-02) | Routing & Reactive State | React Router v6, useState | Practical 1 | Multi-route SPA (`Home`, `Projects`, `Contact`), `NavBar` with `<NavLink>`, controlled inputs, live char counter, Dark/Light mode toggle. |
| [**Practical-03**](file:///D:/SEM-5/awdf/Practical-03) | API Integration & Data Rendering | REST API, useEffect | Practical 2 | Live GitHub API data fetch in `Projects.jsx`, `<Spinner />`, `<ErrorMessage />` with retry trigger, search/filter, and simulated error mode. |
| [**Practical-04**](file:///D:/SEM-5/awdf/Practical-04) | RESTful API with Node.js & Express | Node.js, Express.js | New Backend Baseline | Task Management REST API with in-memory CRUD, global request logger middleware, Content-Type check, custom 404 handler, and global error handling middleware. |
| [**Practical-05**](file:///D:/SEM-5/awdf/Practical-05) | MongoDB Integration & Schema Validation | Express, MongoDB, Mongoose | Practical 4 | Replaces in-memory storage with MongoDB persistence, `Task` Mongoose schema, validation rules, pre-save trimming hook, structured JSON validation errors. |
| [**Practical-06**](file:///D:/SEM-5/awdf/Practical-06) | Full Stack Integration | React + Express + MongoDB | Practicals 3 & 5 | Wires React frontend to Express backend, enables CORS, central `api.js` service, Task UI with full CRUD, toast feedback, delete confirmation dialog. |
| [**Practical-07**](file:///D:/SEM-5/awdf/Practical-07) | JWT Authentication & Security | bcryptjs, jsonwebtoken | Practical 6 | User registration and login, password hashing with bcrypt, JWT token issuing and verification middleware, protected Task CRUD routes, session expiration handling. |
| [**Practical-08**](file:///D:/SEM-5/awdf/Practical-08) | Performance Optimization & Lazy Loading | React.lazy, Suspense | Practical 7 | Route-based code splitting, `<Suspense>` fallback UI, on-demand chunk loading, bundle size and network profiling documentation in `PERFORMANCE.md`. |
| [**Practical-09**](file:///D:/SEM-5/awdf/Practical-09) | In-Memory Caching & Query Optimization | node-cache, Express | Practicals 7 & 8 | Server-side RAM caching for `GET /tasks` with 60s TTL, automatic cache invalidation on `POST`/`PUT`/`DELETE`, cache stats endpoint, response time benchmark in `BENCHMARK.md`. |
| [**Practical-10**](file:///D:/SEM-5/awdf/Practical-10) | Event-Driven Async Processing | Node.js EventEmitter | Practical 9 | Background processing decoupled from HTTP request loop via native `EventEmitter`, immediate 201 response, deferred task notifications, timestamp evidence in `EVENT_EVIDENCE.md`. |
| [**Practical-11**](file:///D:/SEM-5/awdf/Practical-11) | Multi-Container Docker Orchestration | Docker, Docker Compose | Practicals 6–10 | Multi-stage frontend `Dockerfile`, backend Node `Dockerfile`, `docker-compose.yml` linking frontend (5173), backend (5000), and MongoDB (27017) over an internal bridge network with persistent volumes. |
| [**Practical-12**](file:///D:/SEM-5/awdf/Practical-12) | Automated CI/CD Pipeline | GitHub Actions, Jest, Supertest | Practical 11 | `.github/workflows/ci.yml` running linting and automated endpoint test suites on push/PR, with deliberate failure demonstration mode and status badge. |
| [**Practical-13**](file:///D:/SEM-5/awdf/Practical-13) | AI API Integration & Responsible AI | Google Gemini / OpenAI, Node.js | Practicals 6–12 | Server-side AI endpoint (`/api/ai/generate-description`) with rate limiting, server-only secret isolation, user-in-the-loop editable suggestions, AI disclaimers, and local graceful failure fallback. |

---

## 🚀 Quick Execution Guide

### Frontend Practicals (1, 2, 3)
```bash
cd Practical-01   # or Practical-02 or Practical-03
npm install
npm run dev
# Browser: http://localhost:5173
```

### Backend Practicals (4, 5)
```bash
cd Practical-04   # or Practical-05
npm install
npm start
# Port: http://localhost:5000
```

### Full-Stack Practicals (6, 7, 8, 9, 10, 13)
Open two terminal windows:
```bash
# Terminal 1 - Backend
cd Practical-13/backend   # (or 06, 07, 08, 09, 10)
npm install
npm start

# Terminal 2 - Frontend
cd Practical-13/frontend  # (or 06, 07, 08, 09, 10)
npm install
npm run dev
```

### Containerized Stack (Practical 11)
```bash
cd Practical-11
docker-compose up --build
```

### Automated CI/CD Testing (Practical 12)
```bash
cd Practical-12/backend
npm install
npm test
```
