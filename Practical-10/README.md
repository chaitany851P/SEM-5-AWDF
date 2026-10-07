# Practical 10: Asynchronous Processing with Event-Driven Architecture

## Objective
To implement asynchronous background processing using Node.js native `EventEmitter` without external dependencies.

## Carried Forward
- Extends the full-stack authenticated and cached Task Management application from Practicals 7, 8 & 9.

## Key Implementations
1. **Dedicated EventEmitter Module (`events/taskEvents.js`)**:
   - Custom `TaskEvents` class extending Node.js built-in `EventEmitter`.
2. **Modular Event Listeners (`listeners/taskListeners.js`)**:
   - `task-created`: Dispatches asynchronous background notification without delaying the HTTP cycle.
   - `task-deleted`: Handles audit trails and purge logs.
   - `error`: Catches pipeline errors safely.
3. **Decoupled Request-Response Lifecycle**:
   - In `server.js`, `POST /tasks` responds with `201 Created` immediately before the background listener executes.
4. **Timestamp Evidence**:
   - See [EVENT_EVIDENCE.md](file:///D:/SEM-5/awdf/Practical-10/backend/EVENT_EVIDENCE.md) for recorded console output demonstrating non-blocking execution.

## How to Run
### 1. Start Backend
```bash
cd Practical-10/backend
npm install
npm start
```

### 2. Start Frontend
```bash
cd Practical-10/frontend
npm install
npm run dev
```
Create a task in the UI or via Postman; observe the console logs showing the HTTP response timestamp strictly preceding the background notification log.
