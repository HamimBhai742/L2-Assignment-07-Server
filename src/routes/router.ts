import { Router } from 'express';
import { authRouter } from '../models/auth/auth.routes';
export const router = Router();
const routes = [
  {
    path: '/auth',
    router: authRouter,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.router);
});
