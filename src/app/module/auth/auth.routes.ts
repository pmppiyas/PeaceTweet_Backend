import { Router } from 'express';
import { AuthController } from '@/module/auth/auth.controller';
import upload from '@/config/multer';
import validateRequest from '@/middleware/validateRequest';
import { AuthValidations } from '@/module/auth/auth.validation';

const router = Router();

router.post(
  '/signup',
  upload.single('profilePhoto'),
  validateRequest(AuthValidations.createUserValidationSchema),
  AuthController.createUser
);

router.post(
  '/signin',
  validateRequest(AuthValidations.credentialsLoginValidationSchema),
  AuthController.credentialsLogin
);

export const authRoutes = router;
