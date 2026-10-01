# Practical 6: Full Stack Integration (React + Node + MongoDB)

## Objective
To wire the React frontend to the Node/Express/MongoDB backend into a fully functional, end-to-end full-stack application.

## Carried Forward
- Frontend from Practical 3 (Vite + React Router + State + Async lifecycles).
- Backend from Practical 5 (Express + Mongoose + MongoDB CRUD + Validation).

## Key Integrations & Architecture
1. **CORS Enabling on Backend**:
   - `cors` package enabled in `backend/server.js` to allow `http://localhost:5173` to make cross-origin requests to `http://localhost:5000`.
2. **Central API Service (`frontend/src/services/api.js`)**:
   - Manages CRUD calls (`getTasks`, `createTask`, `updateTask`, `deleteTask`).
3. **Full Lifecycle Synchronized State**:
   - New tasks submitted from React form persist into MongoDB.
   - Status toggles update the document in MongoDB (`PUT /tasks/:id`).
   - Task deletions remove the document from MongoDB (`DELETE /tasks/:id`) with browser confirmation.
   - Refreshing the browser confirms data persistence from MongoDB.
4. **Supplementary Features**:
   - Toast notification component providing immediate visual feedback for success/error events.
   - Confirmation dialog before deleting items.

## How to Run
### 1. Start MongoDB Backend
```bash
cd Practical-06/backend
npm install
npm start
# Server listens on http://localhost:5000
```

### 2. Start React Frontend
In a separate terminal:
```bash
cd Practical-06/frontend
npm install
npm run dev
# App opens on http://localhost:5173
```
