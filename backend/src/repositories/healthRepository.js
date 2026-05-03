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

    for (const collection of collections) {
      const count = await db.collection(collection.name).countDocuments();
      stats[collection.name] = count;
    }

    return stats;
  },
};

export default healthRepository;
