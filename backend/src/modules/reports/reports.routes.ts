import { Router } from 'express';
import { reportsController } from './reports.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/:childId/reports', reportsController.getReports);
router.post('/:childId/reports/generate', reportsController.generateReport);

export default router;
