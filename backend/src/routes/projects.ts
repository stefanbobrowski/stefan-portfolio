import { Router } from 'express';
import projects from '../data/projects.json' with { type: 'json' };

const router = Router();

router.get('/', async (req, res) => {
  res.json(projects);
});

export default router;
