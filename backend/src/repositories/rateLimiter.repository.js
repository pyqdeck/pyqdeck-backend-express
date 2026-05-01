import config from '../config/index.js';

class InMemoryRateLimitStore {
  #store = new Map();

  async get(key) {
    const record = this.#store.get(key);
    if (!record) return null;

    if (Date.now() > record.resetTime) {
      this.#store.delete(key);
      return null;
    }

    return record;
  }

  async set(key, data, windowMs) {
    this.#store.set(key, {
      ...data,
      resetTime: Date.now() + windowMs,
    });
  }

  async increment(key, windowMs) {
    const record = await this.get(key);

    if (!record) {
      const newRecord = {
        count: 1,
        resetTime: Date.now() + windowMs,
      };
      await this.set(key, newRecord, windowMs);
      return newRecord;
    }

    record.count += 1;
    await this.set(key, record, windowMs);
    return record;
  }

  async reset(key) {
    this.#store.delete(key);
  }

  async cleanup() {
    const now = Date.now();
    for (const [key, record] of this.#store.entries()) {
      if (now > record.resetTime) {
        this.#store.delete(key);
      }
    }
  }
}

export const inMemoryRateLimitStore = new InMemoryRateLimitStore();

setInterval(() => {
  inMemoryRateLimitStore.cleanup();
}, 60 * 1000);

export default inMemoryRateLimitStore;
