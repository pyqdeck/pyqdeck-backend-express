import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./tests/setup.js'],
    include: ['tests/**/*.test.js'],
    hookTimeout: 120000,
    testTimeout: 120000,
    fileParallelism: false,
    maxWorkers: 1,
    minWorkers: 1,
    },
    });
