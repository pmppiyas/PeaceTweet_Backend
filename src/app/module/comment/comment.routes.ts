import { checkAuth } from '@/middleware/checkAuth';
import { CommentController } from '@/module/comment/comment.controller';
import { Router } from 'express';

const router = Router();

router.post('/', checkAuth(), CommentController.addComment);

router.delete('/:id', checkAuth(), CommentController.deleteComment);

router.patch('/:id', checkAuth(), CommentController.editComment);

export const commentRoutes = router;
