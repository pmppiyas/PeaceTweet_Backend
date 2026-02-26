import { authRoutes } from '@/module/auth/auth.routes';
import { commentRoutes } from '@/module/comment/comment.routes';
import { postRoutes } from '@/module/post/post.routes';
import { userRoutes } from '@/module/user/user.routes';
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
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/post',
    route: postRoutes,
  },

  {
    path: '/comment',
    route: commentRoutes,
  },
];

allRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
