import mongoose from 'mongoose';

/**
 * Maintenance repository for low-level database administrative tasks.
 */
export const maintenanceRepository = {
  /**
   * Deletes all records from all collections except those specified in the exclusion list.
   * @param {string[]} excludeCollections - List of collection names to preserve.
   * @returns {Promise<Record<string, number>>} Map of collection names to deleted counts.
   */
  async wipeCollections(excludeCollections = ['users']) {
    const collections = mongoose.connection.collections;
    const deletedCounts = {};

    for (const key in collections) {
      if (excludeCollections.includes(key)) {
        continue;
      }

      const collection = collections[key];
      const result = await collection.deleteMany({});
      deletedCounts[key] = result.deletedCount;
    }

    return deletedCounts;
  },
};
