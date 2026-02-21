import { Router } from 'express';
import { AuthController } from '@/module/auth/auth.controller';
import upload from '@/config/multer';
import validateRequest from '@/utils/validateRequest';
import { AuthValidations } from '@/module/auth/auth.validation';

const router = Router();

router.post(
  '/signup',
  upload.single('profilePhoto'),
  validateRequest(AuthValidations.createUserValidationSchema),
  AuthController.createUser
);

export const authRoutes = router;
