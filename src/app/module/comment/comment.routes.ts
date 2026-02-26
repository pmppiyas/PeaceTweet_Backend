import { checkAuth } from '@/middleware/checkAuth';
import validateRequest from '@/middleware/validateRequest';
import { CommentController } from '@/module/comment/comment.controller';
import { commentValidationSchema } from '@/module/comment/comment.validation';
import { Router } from 'express';

const router = Router();

router.post(
  '/',
  validateRequest(commentValidationSchema),
  checkAuth(),
  CommentController.addComment
);

router.delete('/:id', checkAuth(), CommentController.deleteComment);

router.patch(
  '/:id',
  validateRequest(commentValidationSchema),
  checkAuth(),
  CommentController.editComment
);

export const commentRoutes = router;
