import { Router } from 'express';
import skills from '../data/skills.json' with { type: 'json' };

const router = Router();

router.get('/', async (req, res) => {
  res.json(skills);
});

export default router;
