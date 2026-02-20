import { authRoutes } from '@/module/auth/auth.routes';
import { Router } from 'express';

const router = Router();

interface routerArgs {
  path: string;
  route: Router;
}

const allRoutes: routerArgs[] = [
  {
    path: '/auth',
    route: authRoutes,
  },
];

allRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
