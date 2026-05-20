import { Router } from 'express';
import { childrenController } from './children.controller';
import { authenticate } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validate.middleware';
import { createChildSchema, updateChildSchema, childParamSchema, awardStickerSchema } from './children.schema';

const router = Router();

router.use(authenticate);

router.get('/', childrenController.list);
router.post('/', validate(createChildSchema), childrenController.create);
router.get('/:id', validate(childParamSchema), childrenController.get);
router.put('/:id', validate(updateChildSchema), childrenController.update);
router.delete('/:id', validate(childParamSchema), childrenController.delete);
router.get('/:id/stickers', validate(childParamSchema), childrenController.getStickers);
router.post('/:id/stickers', validate(awardStickerSchema), childrenController.awardSticker);

export default router;
