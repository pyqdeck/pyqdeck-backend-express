import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { beforeAll, afterAll, beforeEach, vi } from 'vitest';

// Mock loggerService to silence logs during tests
vi.mock('../src/utils/logger/index.js', () => ({
  loggerService: {
    getLogger: () => ({
      info: vi.fn(),
      error: vi.fn(),
      warn: vi.fn(),
      debug: vi.fn(),
    }),
  },
  default: {
    getLogger: () => ({
      info: vi.fn(),
      error: vi.fn(),
      warn: vi.fn(),
      debug: vi.fn(),
    }),
  },
}));

// Mock Clerk middleware and client
vi.mock('@clerk/express', () => ({
  clerkMiddleware: () => (req, res, next) => {
    // By default, do not populate req.auth to simulate unauthenticated state
    next();
  },
  getAuth: vi.fn((req) => req.auth || {}),
  clerkClient: {
    users: {
      getUser: vi.fn().mockResolvedValue({
        id: 'test_user_123',
        firstName: 'Test',
        lastName: 'User',
        emailAddresses: [{ id: 'email_1', emailAddress: 'test@example.com' }],
        primaryEmailAddressId: 'email_1',
      }),
    },
  },
}));

let mongod;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  await mongoose.connect(uri);
  // Ensure indexes are created for all registered models
  const models = mongoose.modelNames();
  await Promise.all(models.map((name) => mongoose.model(name).syncIndexes()));
});

afterAll(async () => {
  await mongoose.disconnect();
  if (mongod) {
    await mongod.stop();
  }
});

beforeEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
});
