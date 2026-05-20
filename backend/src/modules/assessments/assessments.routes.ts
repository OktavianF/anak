import { Router } from 'express';
import { assessmentsController } from './assessments.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/:childId/assessments', assessmentsController.list);
router.get('/:childId/assessments/chc', assessmentsController.getChcSummary);
router.get('/:childId/assessments/recommendations', assessmentsController.getRecommendations);

export default router;
