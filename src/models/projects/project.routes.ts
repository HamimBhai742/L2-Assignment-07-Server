import { Router } from 'express';
import { projectController } from './project.controller';
import { checkAuth } from '../../middleware/jwt.verify';
import { createProjectSchema, updateProjectSchema } from './projects.schema';
import { validateRequest } from '../../middleware/validation.sachem';

const router = Router();

router.post(
  '/create',
  checkAuth('ADMIN'),
  validateRequest(createProjectSchema),
  projectController.createNewProject
);
router.get('/', projectController.getAllProjects);
router.get('/my-projects', checkAuth('ADMIN'), projectController.getMyProjects);
router.put(
  '/update/:id',
  checkAuth('ADMIN'),
  validateRequest(updateProjectSchema),
  projectController.updateProject
);

router.delete(
  '/delete/:id',
  checkAuth('ADMIN'),
  projectController.deleteProject
);

export const projectRouter = router;
