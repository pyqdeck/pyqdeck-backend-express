import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { beforeAll, afterAll, beforeEach, vi } from 'vitest';

// Mock Clerk middleware and client
vi.mock('@clerk/express', () => ({
  clerkMiddleware: () => (req, res, next) => {
    req.auth = { userId: 'test_user_123' };
    next();
  },
  getAuth: () => ({ userId: 'test_user_123' }),
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
