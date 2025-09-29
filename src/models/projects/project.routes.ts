import { Router } from 'express';
import { projectController } from './project.controller';
import { checkAuth } from '../../middleware/jwt.verify';
import { createProjectSchema } from './projects.schema';
import { validateRequest } from '../../middleware/validation.sachem';

const router = Router();

router.post(
  '/create',
  checkAuth('ADMIN'),
  validateRequest(createProjectSchema),
  projectController.createNewProject
);
router.get('/', projectController.getAllProjects);
router.get('/my-project', checkAuth('ADMIN'), projectController.getMyProjects);

export const projectRouter = router;
