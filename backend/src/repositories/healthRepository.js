import mongoose from 'mongoose';

export const healthRepository = {
  async checkDatabase() {
    const state = mongoose.connection.readyState;
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting',
    };

    return {
      status: states[state] || 'unknown',
      isConnected: state === 1,
    };
  },

  async getDatabaseStats() {
    const db = mongoose.connection.db;
    if (!db) return {};
    const collections = await db.listCollections().toArray();
    const stats = {};

    const counts = await Promise.all(
      collections.map((collection) =>
        db.collection(collection.name).countDocuments()
      )
    );

    collections.forEach((collection, index) => {
      stats[collection.name] = counts[index];
    });

    return stats;
  },
};

export default healthRepository;
