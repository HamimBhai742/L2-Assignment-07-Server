import { Router } from 'express';
import { userRouter } from '../models/user/user.routes';
import { authRouter } from '../models/auth/auth.routes';
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
];

routes.forEach((route) => {
  router.use(route.path, route.router);
});
