import { Router } from 'express';
import { userRouter } from '../models/user/user.routes';
export const router = Router();
const routes = [
  {
    path: '/user',
    router: userRouter,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.router);
});
