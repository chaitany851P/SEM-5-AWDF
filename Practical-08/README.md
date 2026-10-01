# Practical 8: Performance Optimization and Lazy Loading in React

## Objective
To improve frontend performance using lazy loading and route-based code splitting techniques.

## Carried Forward
- Extends the full-stack Task Management React frontend and Express backend from Practical 7.

## Key Changes
1. **Dynamic Route Imports via `React.lazy()`**:
   - Converted static page imports (`Home`, `TaskManager`, `Analytics`, `Contact`, `NotFound`) into dynamic imports `lazy(() => import('./pages/...'))`.
2. **Suspense Boundary**:
   - Wrapped the `<Routes>` hierarchy inside `<Suspense fallback={<RouteLoadingFallback />}>` to render an animated indicator while on-demand chunks are fetched.
3. **Dedicated Performance Documentation**:
   - Detailed bundle analysis and before-vs-after metrics available in `frontend/PERFORMANCE.md`.

## How to Run
### 1. Backend
```bash
cd Practical-08/backend
npm install
npm start
```

### 2. Frontend
```bash
cd Practical-08/frontend
npm install
npm run dev
```

### 3. Verify Code Splitting in Build Output
```bash
cd Practical-08/frontend
npm run build
```
Notice how Vite outputs discrete chunk files for each route rather than a single massive bundle!
