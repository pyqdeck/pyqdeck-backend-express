import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./tests/setup.js'],
    include: ['tests/**/*.integration.test.js'],
    pool: 'forks',
    forks: {
      singleFork: false,
    },
    // Increased timeouts for integration tests
    hookTimeout: 120000,
    testTimeout: 120000,
    reporters: ['default', 'junit'],
    outputFile: 'test-report-integration.junit.xml',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'tests/',
        'src/config/',
        'src/utils/logger/',
        'src/utils/index.js',
      ],
    },
  },
});
