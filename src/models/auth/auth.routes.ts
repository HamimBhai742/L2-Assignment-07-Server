import { Router } from 'express';
import { authController } from './auth.controller';
import { checkAuth } from '../../middleware/jwt.verify';

const router = Router();

router.post('/login', authController.loginWithEmailAndPass);
router.post('/verify', checkAuth('ADMIN'), authController.verifyUser);
router.get('/me', authController.getMe);
router.post('/logout', authController.logout);
export const authRouter = router;
