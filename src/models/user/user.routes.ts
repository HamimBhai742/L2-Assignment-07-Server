import { Router } from 'express';
import { userController } from './user.controller';
import { checkAuth } from '../../middleware/jwt.verify';
import { validateRequest } from '../../middleware/validation.sachem';
import { updateUserZodSchema } from './user.schema';

const router = Router();

router.put(
  '/update-profile',
  checkAuth('ADMIN'),
  validateRequest(updateUserZodSchema),
  userController.updateProfile
);

export const userRouter = router;
