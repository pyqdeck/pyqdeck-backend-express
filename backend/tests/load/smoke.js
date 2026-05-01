import http from 'k6/http';
import { check, sleep } from 'k6';

// Smoke Test: Verify the system can handle a small amount of load
export const options = {
  vus: 3, // 3 virtual users
  duration: '1m', // 1 minute
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests must complete below 500ms
    http_req_failed: ['rate<0.01'], // Less than 1% of requests should fail
  },
};

export default function () {
  const BASE_URL = __ENV.API_URL || 'http://localhost:3000/api/v1';

  // 1. Check health
  const healthRes = http.get(`${BASE_URL}/health`);
  check(healthRes, {
    'health status is 200': (r) => r.status === 200,
  });

  sleep(1);
}
