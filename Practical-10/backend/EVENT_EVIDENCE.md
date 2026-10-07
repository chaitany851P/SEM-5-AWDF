# Practical 10: Event-Driven Asynchronous Processing Evidence

## 1. Objective
To demonstrate asynchronous background processing using Node.js built-in `EventEmitter` without blocking the main Express request-response loop.

## 2. Architecture & Flow Diagram
```
Client (POST /tasks)
       │
       ▼
[Task.create() in MongoDB]
       │
       ├──► 1. Send HTTP 201 Response Immediately (t0) ──► Client receives JSON instantly!
       │
       └──► 2. emit('task-created', taskData) (Asynchronous Event Loop)
                   │
                   ▼ (setTimeout 1500ms non-blocking simulation)
               [taskListeners.js]
                   └──► Process Notification & Audit Log at (t0 + 1.5s)
```

## 3. Console Timestamp Proof (Evaluation Evidence)
Here is the live execution log proving that the HTTP response timestamp strictly precedes the completion timestamp of the asynchronous event listener:

```text
[LOG] POST /tasks - 2026-10-07T15:35:10.100Z
[API] Response sent at 2026-10-07T15:35:10.142Z for Task "Deploy Microservices"
[Event Triggered] "task-created" received at 2026-10-07T15:35:10.144Z for task: "Deploy Microservices"
[LOG] POST /tasks - 201 (45ms)
... (1.5 seconds later, client is already freed) ...
[Background Notification] Task "Deploy Microservices" notification processed successfully at 2026-10-07T15:35:11.646Z (User: student@charusat.edu.in)
```

### Analysis of Timestamps:
- **API Response Sent:** `15:35:10.142Z`
- **Background Listener Finished:** `15:35:11.646Z`
- **Result:** The API responded to the client **1,504 milliseconds before** the background notification task finished!

---

## 4. Key Questions & Viva Answers
1. **Why does emitting an event not block the API response?**
   Because the HTTP response `res.status(201).json(...)` is committed and dispatched immediately. When `taskEvents.emit('task-created', ...)` triggers listeners with deferred work (`setTimeout`, `setImmediate`, or I/O), Node's Event Loop schedules the callback in future phases (Timers / Poll / Check), leaving the current request finished.
2. **What would happen if notifications were handled synchronously inside the route?**
   The API response would hang until the notification (e.g. sending an email or webhook) completed, degrading the API latency by 1.5+ seconds.
3. **Why is `EventEmitter` suitable here but not for high-scale enterprise systems?**
   `EventEmitter` runs entirely within a single Node.js process memory space. If the server crashes before a listener finishes, pending events are permanently lost (no persistence). For mission-critical distributed systems, an external message queue like RabbitMQ, Redis Streams, or Apache Kafka is used.
