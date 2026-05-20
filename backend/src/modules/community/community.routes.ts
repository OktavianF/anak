import { Router } from 'express';
import { communityController } from './community.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/posts', communityController.listPosts);
router.post('/posts', communityController.createPost);
router.post('/posts/:id/like', communityController.toggleLike);
router.get('/posts/:id/comments', communityController.getComments);
router.post('/posts/:id/comments', communityController.addComment);
router.get('/guides', communityController.listGuides);

export default router;
