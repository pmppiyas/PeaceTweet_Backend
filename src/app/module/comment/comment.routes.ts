import { checkAuth } from '@/middleware/checkAuth';
import { CommentController } from '@/module/comment/comment.controller';
import { Router } from 'express';

const router = Router();

router.post('/add', checkAuth(), CommentController.addComment);

router.delete('/:id', checkAuth(), CommentController.deleteComment);

export const commentRoutes = router;
