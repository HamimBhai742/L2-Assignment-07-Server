import { Router } from 'express';
import { authController } from './auth.controller';

const router = Router();

router.post('/login', authController.loginWithEmailAndPass);

export const authRouter = router;
