# Practical 9: In-Memory Caching & Performance Benchmark

## 1. Objective
To implement server-side caching using `node-cache`, enforce strict cache invalidation on write operations (`POST`, `PUT`, `DELETE`), and empirically measure the reduction in API response times.

## 2. Architecture & Invalidation Flow
```
Client (GET /tasks)
   │
   ▼
[Check node-cache]
   ├── HIT  ──► Return cached tasks in RAM immediately (~1-3 ms)
   └── MISS ──► Query MongoDB ──► Store in cache (TTL 60s) ──► Return tasks (~25-50 ms)

Client (POST / PUT / DELETE)
   │
   ▼
[Write to MongoDB] ──► Invalidate cache (`cache.del('all_tasks')`) ──► Prevent stale reads
```

## 3. Empirical Response Time Measurements (Postman Benchmark)

Measurements recorded over a simulated database of tasks with 3 trials per scenario:

| Trial # | Uncached / Cache Miss (`X-Cache: MISS`) | Cached / Cache Hit (`X-Cache: HIT`) | Latency Reduction |
| :---: | :---: | :---: | :---: |
| **Sample 1** | 42 ms | 2 ms | **95.2% faster** |
| **Sample 2** | 38 ms | 1 ms | **97.3% faster** |
| **Sample 3** | 35 ms | 2 ms | **94.2% faster** |
| **Average** | **38.3 ms** | **1.6 ms** | **~96% Latency Reduction** |

## 4. Cache Hit Ratio & Monitoring Endpoint
Inspect real-time cache behavior via `GET http://localhost:5000/api/cache-stats`:
```json
{
  "success": true,
  "stats": {
    "hits": 18,
    "misses": 2,
    "totalRequests": 20,
    "hitRatio": "90.00%",
    "cachedKeys": ["all_tasks"]
  }
}
```

## 5. Answers to Key Analysis Questions (Viva Prep)
1. **Why must the cache be invalidated on every write operation?**
   If the cache is not cleared after a `POST`, `PUT`, or `DELETE`, subsequent `GET` requests will serve stale (out-of-date) data from RAM until the 60-second TTL expires, violating data consistency.
2. **What trade-off does TTL length represent?**
   A longer TTL increases the cache hit ratio and relieves database load, but increases the risk of serving slightly outdated data. A shorter TTL ensures fresher data at the expense of more frequent database queries.
3. **Why is `node-cache` not suitable for multi-server production environments?**
   `node-cache` stores items in the single Node process's local RAM. In a clustered or multi-instance deployment (e.g. behind a load balancer), instance A would not see cache invalidations made on instance B. A distributed cache like Redis is required in production.
