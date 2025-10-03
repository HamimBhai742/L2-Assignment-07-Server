import { Router } from 'express';
import { userController } from './user.controller';
import { checkAuth } from '../../middleware/jwt.verify';
import { validateRequest } from '../../middleware/validation.sachem';
import { updateUserZodSchema } from './user.schema';

const router = Router();

router.get('/me', checkAuth('ADMIN'), userController.getMyProfile);
router.get('/', userController.getUser);
router.get('/about', userController.getAbout);
router.put(
  '/update-profile',
  checkAuth('ADMIN'),
  validateRequest(updateUserZodSchema),
  userController.updateProfile
);

export const userRouter = router;
