import upload from '@/config/multer';
import { checkAuth } from '@/middleware/checkAuth';
import validateRequest from '@/middleware/validateRequest';
import { PostController } from '@/module/post/post.controller';
import { PostValidations } from '@/module/post/post.validation';
import { Router } from 'express';

const router = Router();

router.post(
  '/create',
  checkAuth(),
  upload.none(),
  validateRequest(PostValidations.create),
  PostController.createPost
);

router.get('/my', checkAuth(), PostController.myPosts);

export const postRoutes = router;
