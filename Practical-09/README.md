# Practical 9: In-Memory Caching and Query Optimization

## Objective
To implement server-side caching using `node-cache`, ensure cache correctness through explicit write-invalidation, and measure its impact on API response times.

## Carried Forward
- Extends the full-stack authenticated Task Management application from Practical 7 & 8.

## Key Implementations
1. **Server-Side In-Memory Cache (`node-cache`)**:
   - `stdTTL: 60` seconds for all task queries.
   - `GET /tasks` checks the cache first:
     - Returns with `X-Cache: HIT` and latency in under 3 ms.
     - On cache miss, executes `Task.find()` against MongoDB, caches the result, and returns `X-Cache: MISS`.
2. **Immediate Cache Invalidation**:
   - Every `POST /tasks`, `PUT /tasks/:id`, and `DELETE /tasks/:id` clears `all_tasks` (and the single task key `task_:id`) so clients never see stale data.
3. **Cache Monitoring**:
   - `GET /api/cache-stats` reports hits, misses, and hit percentage.
4. **Empirical Benchmarking**:
   - See `backend/BENCHMARK.md` for recorded sample response times and viva explanations.

## How to Run
### 1. Start Caching Backend
```bash
cd Practical-09/backend
npm install
npm start
# Runs on http://localhost:5000
```

### 2. Start Optimized Frontend
```bash
cd Practical-09/frontend
npm install
npm run dev
# Runs on http://localhost:5173
```
