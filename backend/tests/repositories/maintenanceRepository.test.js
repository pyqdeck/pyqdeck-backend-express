import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import mongoose from 'mongoose';
import { maintenanceRepository } from '../../src/repositories/maintenanceRepository.js';
import { University } from '../../src/models/University.js';
import { User } from '../../src/models/User.js';

describe('maintenanceRepository', () => {
  beforeEach(async () => {
    // Clear all collections before each test
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany({});
    }
  });

  afterAll(async () => {
    // Optional: cleanup
  });

  describe('wipeCollections', () => {
    it('should delete all records except for users', async () => {
      // Create some data
      await University.create({
        name: 'Test Uni',
        slug: 'test-uni',
        shortName: 'TU',
      });
      await User.create({
        clerkId: 'user_1',
        name: 'Test User',
        email: 'test@example.com',
      });

      // Verify counts before
      const uniCountBefore = await University.countDocuments();
      const userCountBefore = await User.countDocuments();
      expect(uniCountBefore).toBe(1);
      expect(userCountBefore).toBe(1);

      // Perform wipe
      const result = await maintenanceRepository.wipeCollections(['users']);

      // Verify counts after
      const uniCountAfter = await University.countDocuments();
      const userCountAfter = await User.countDocuments();

      expect(uniCountAfter).toBe(0);
      expect(userCountAfter).toBe(1);
      expect(result.universities).toBe(1);
      expect(result.users).toBeUndefined(); // Since it was excluded
    });
  });
});
