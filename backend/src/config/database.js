import mongoose from 'mongoose';
import config from './index.js';
import { loggerService } from '../utils/index.js';

const logger = loggerService.getLogger();

class Database {
  #isConnected = false;

  async connect() {
    if (this.#isConnected) {
      logger.info('Database already connected');
      return;
    }

    try {
      mongoose.connection.on('connected', () => {
        logger.info('MongoDB connected successfully');
        this.#isConnected = true;
      });

      mongoose.connection.on('error', (err) => {
        logger.error('MongoDB connection error', { error: err.message });
      });

      mongoose.connection.on('disconnected', () => {
        logger.warn('MongoDB disconnected');
        this.#isConnected = false;
      });

      await mongoose.connect(config.mongoUri);
    } catch (error) {
      logger.error('Failed to connect to MongoDB', { error: error.message });
      throw error;
    }
  }

  async disconnect() {
    if (!this.#isConnected) return;

    try {
      await mongoose.disconnect();
      this.#isConnected = false;
      logger.info('MongoDB disconnected gracefully');
    } catch (error) {
      logger.error('Error disconnecting from MongoDB', {
        error: error.message,
      });
    }
  }

  get isConnected() {
    return this.#isConnected;
  }
}

export const database = new Database();
export default database;
