import app from './app';
import { env } from './config/env';
import logger from './utils/logger';

app.listen(env.PORT, () => {
  logger.info(`🚀 ANAK Backend running on port ${env.PORT}`);
  logger.info(`📌 Environment: ${env.NODE_ENV}`);
  logger.info(`🔗 Health check: http://localhost:${env.PORT}/api/v1/health`);
});
