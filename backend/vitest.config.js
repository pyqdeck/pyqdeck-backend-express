import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./tests/setup.js'],
    include: ['tests/**/*.test.js'],

    // Vitest 4: pool options moved to top-level under test
    pool: 'forks',
    forks: {
      singleFork: true,
    },

    // Increased timeouts for heavy CI/local runs
    hookTimeout: 120000,
    testTimeout: 120000,

    reporters: ['default', 'junit'],
    outputFile: 'test-report.junit.xml',

    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary', 'json', 'html', 'lcov'],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 70,
        statements: 80,
      },
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
