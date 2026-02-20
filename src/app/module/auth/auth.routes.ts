import { Router } from 'express';
import { AuthController } from '@/module/auth/auth.controller';

const router = Router();

router.post('/signup', AuthController.createUser);

export const authRoutes = router;
