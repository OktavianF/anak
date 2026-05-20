import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env';
import { errorHandler, notFoundHandler } from './middleware/error.middleware';
import logger from './utils/logger';

// Route imports
import authRoutes from './modules/auth/auth.routes';
import childrenRoutes from './modules/children/children.routes';
import gamesRoutes from './modules/games/games.routes';
import assessmentsRoutes from './modules/assessments/assessments.routes';
import consultationRoutes from './modules/consultation/consultation.routes';
import communityRoutes from './modules/community/community.routes';
import reportsRoutes from './modules/reports/reports.routes';

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, _res, next) => {
  logger.debug(`${req.method} ${req.path}`);
  next();
});

// Health check
app.get('/api/v1/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/children', childrenRoutes);
app.use('/api/v1/children', gamesRoutes);       // /children/:childId/games/*
app.use('/api/v1/children', assessmentsRoutes);  // /children/:childId/assessments/*
app.use('/api/v1/children', reportsRoutes);      // /children/:childId/reports/*
app.use('/api/v1', consultationRoutes);          // /doctors/*, /appointments/*
app.use('/api/v1/community', communityRoutes);   // /community/posts/*, /community/guides

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
