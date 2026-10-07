# Practical 12: CI/CD Pipeline with GitHub Actions

[![CI Pipeline](https://github.com/your-username/task-manager-api/actions/workflows/ci.yml/badge.svg)](https://github.com/your-username/task-manager-api/actions)

## Objective
To automate testing and validation of the application using a continuous integration (CI) pipeline with GitHub Actions.

## CI Pipeline Architecture
```
git push origin main
       │
       ▼
 GitHub Actions Trigger (on: push / pull_request to main)
       │
       ├──► Job 1: lint (Node.js syntax check & validation)
       │         │
       │         ▼ (success)
       └──► Job 2: test (build-and-test)
                 ├── Checkout repository (actions/checkout@v4)
                 ├── Setup Node.js 18 (actions/setup-node@v4)
                 ├── Install dependencies (npm install)
                 ├── Run automated Jest + Supertest suites (npm test)
                 └── Report Pass (Green Checkmark) or Fail (Red X) status
```

---

## Evaluation Requirements: Failed vs Fixed Pipeline Demo

The lab evaluation rubric awards marks for demonstrating both a failed and a passed pipeline run:

### 1. How to Trigger Deliberate Pipeline Failure (Red ❌)
In `backend/tests/api.test.js`, run or trigger the deliberate failure mode:
1. In `backend/tests/api.test.js`, change line 23:
   ```javascript
   expect(res.statusCode).toBe(200); // Intentionally expecting 200 on an invalid 404 endpoint
   ```
2. Commit and push:
   ```bash
   git add .
   git commit -m "test: deliberate failure for CI demonstration"
   git push origin main
   ```
3. Open GitHub repository > **Actions** tab.
4. Observe the pipeline failing with a **Red X** ❌ and inspect the test error in the workflow execution logs.

### 2. How to Fix Pipeline (Green ✅)
1. Restore the correct assertion in `backend/tests/api.test.js`:
   ```javascript
   expect(res.statusCode).toBe(404);
   ```
2. Commit and push:
   ```bash
   git add .
   git commit -m "fix: restore passing assertion in api.test.js"
   git push origin main
   ```
3. Observe GitHub Actions rerun and complete with a **Green Checkmark** ✅.

---

## Local Test Execution
You can test the suite locally before pushing:
```bash
cd Practical-12/backend
npm install
npm test
```
To run the deliberate failure locally:
```bash
npm run test:deliberate-fail
```
