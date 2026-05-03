import http from 'k6/http';
import { check, sleep } from 'k6';

// Stress Test: Ramp up load to see where the system breaks
export const options = {
  stages: [
    { duration: '1m', target: 20 }, // Ramp up to 20 users
    { duration: '2m', target: 20 }, // Stay at 20 users
    { duration: '1m', target: 50 }, // Ramp up to 50 users
    { duration: '2m', target: 50 }, // Stay at 50 users
    { duration: '1m', target: 0 }, // Ramp down to 0
  ],
  thresholds: {
    http_req_duration: ['p(95)<1000'], // 95% of requests must complete below 1s
    http_req_failed: ['rate<0.05'], // Less than 5% failures under heavy load
  },
};

export default function () {
  const BASE_URL = __ENV.API_URL || 'http://localhost:3000/api/v1';

  // Hits the health endpoint as a proxy for general load
  const res = http.get(`${BASE_URL}/health/detailed`);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });

  sleep(1);
}
