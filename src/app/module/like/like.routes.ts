import { checkAuth } from '@/middleware/checkAuth';
import validateRequest from '@/middleware/validateRequest';
import { LikeController } from '@/module/like/like.controller';
import { likeSchemaValidation } from '@/module/like/like.validaton';
import { Router } from 'express';

const router = Router();

router.post(
  '/toggle',
  validateRequest(likeSchemaValidation),
  checkAuth(),
  LikeController.toggleLike
);

export const likeRoutes = router;
