// src/routes/v1.ts
import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.send('API v1 working');
});

export default router;
