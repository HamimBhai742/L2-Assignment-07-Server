import { Router } from 'express';
import { authRouter } from '../models/auth/auth.routes';
import { projectRouter } from '../models/projects/project.routes';
import { userRouter } from '../models/user/user.routes';
import { blogRouter } from '../models/blog/blog.routes';
import { statsRouter } from '../models/stats/status.route';
export const router = Router();
const routes = [
  {
    path: '/user',
    router: userRouter,
  },
  {
    path: '/auth',
    router: authRouter,
  },
  {
    path: '/projects',
    router: projectRouter,
  },
  {
    path: '/blog',
    router: blogRouter,
  },
  {
    path: '/stats',
    router: statsRouter,
  }
];

routes.forEach((route) => {
  router.use(route.path, route.router);
});
