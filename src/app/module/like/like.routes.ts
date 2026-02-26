import { checkAuth } from '@/middleware/checkAuth';
import { LikeController } from '@/module/like/like.controller';
import { Router } from 'express';

const router = Router();

router.post('/toggle', checkAuth(), LikeController.toggleLike);

export const likeRoutes = router;
