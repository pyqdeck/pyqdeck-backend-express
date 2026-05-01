import app from './app.js';
import config from './config/index.js';
import database from './config/database.js';
import { loggerService } from './utils/index.js';

const logger = loggerService.getLogger();

// Database connection
database.connect().catch((err) => {
  logger.error('Database connection failed', { error: err.message });
  process.exit(1);
});

const PORT = config.port || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT} in ${config.nodeEnv} mode`);
  logger.info(
    `API Documentation available at http://localhost:${PORT}/api-docs`
  );
});
