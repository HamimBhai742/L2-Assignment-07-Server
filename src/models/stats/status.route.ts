import { Router } from 'express';
import { statsController } from './stats.controller';
import { checkAuth } from '../../middleware/jwt.verify';

const router = Router();

router.get('/',  statsController.stats);
export const statsRouter = router;