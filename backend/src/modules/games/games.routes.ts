import { Router } from 'express';
import { gamesController } from './games.controller';
import { authenticate } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validate.middleware';
import { submitSessionSchema, childIdParamSchema, gameProgressSchema } from './games.schema';

const router = Router();

router.use(authenticate);

router.post('/:childId/games/sessions', validate(submitSessionSchema), gamesController.submitSession);
router.get('/:childId/games/progress', validate(childIdParamSchema), gamesController.getProgress);
router.get('/:childId/games/progress/:gameType', validate(gameProgressSchema), gamesController.getGameTypeProgress);

export default router;
