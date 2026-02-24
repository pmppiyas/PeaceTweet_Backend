import upload from '@/config/multer';
import { UserController } from '@/module/user/user.controller';
import { UserValidations } from '@/module/user/user.validation';
import validateRequest from '@/middleware/validateRequest';
import { Router } from 'express';
import { checkAuth } from '@/middleware/checkAuth';

const router = Router();

router.put(
  '/update',
  checkAuth(),
  upload.single('profilePhoto'),
  validateRequest(UserValidations.updateUserValidationSchema),
  UserController.updateUser
);

export const userRoutes = router;
