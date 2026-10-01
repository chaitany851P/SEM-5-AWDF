# Advanced Web Development Frameworks (ITUE301) - Lab Work

This repository contains the complete implementation of Practicals 1 through 9 for the 5th Semester B.Tech Information Technology curriculum at Charotar University of Science and Technology (CSPIT - IT), based on [AWDF_PL.pdf](file:///D:/SEM-5/awdf/AWDF_PL.pdf).

---

## 📁 Practical Directory Index & Progression

Each practical carries forward the previous practical's work in an incremental, modular architecture:

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
| [**Practical-09**](file:///D:/SEM-5/awdf/Practical-09) | In-Memory Caching & Query Optimization | node-cache, Express | Practical 7 & 8 | Server-side RAM caching for `GET /tasks` with 60s TTL, automatic cache invalidation on `POST`/`PUT`/`DELETE`, cache stats endpoint, response time benchmark in `BENCHMARK.md`. |

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

### Full-Stack Practicals (6, 7, 8, 9)
For full-stack practicals, open two terminal windows:
```bash
# Terminal 1 - Backend
cd Practical-06/backend   # (or 07, 08, 09)
npm install
npm start

# Terminal 2 - Frontend
cd Practical-06/frontend  # (or 07, 08, 09)
npm install
npm run dev
```
