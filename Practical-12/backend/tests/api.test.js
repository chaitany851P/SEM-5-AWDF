const request = require('supertest');
const app = require('../server');

describe('Task Management API - CI/CD Automated Test Suite', () => {
  // Test 1: Verify Cache Stats debug endpoint
  test('GET /api/cache-stats should return 200 and cache metrics object', async () => {
    const res = await request(app).get('/api/cache-stats');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.stats).toBeDefined();
    expect(typeof res.body.stats.hits).toBe('number');
  });

  // Test 2: Verify Protected Route Enforcement
  test('GET /tasks without Authorization header should return 401 Unauthorized', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe('Unauthorized');
  });

  // Test 3: Automated Test with Deliberate Failure Mode for CI demonstration
  test('GET /tasks with invalid endpoint should return 404 Route Not Found', async () => {
    const res = await request(app).get('/non-existent-route-for-testing');
    
    // If deliberate failure environment variable is active, fail assertion intentionally
    if (process.env.FAIL_TEST === 'true') {
      console.log('>>> [DEMONSTRATION] Triggering deliberate test failure for CI/CD Red X demo...');
      expect(res.statusCode).toBe(200); // Intentionally incorrect expectation (triggers fail)
    } else {
      expect(res.statusCode).toBe(404); // Correct passing expectation
    }
  });
});
