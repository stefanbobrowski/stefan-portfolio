import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import askStefanRoute from './routes/ask-stefan.js';
import skillsRoute from './routes/skills.js';
import projectsRoute from './routes/projects.js';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      'https://stefanbobrowski.com',
      'https://www.stefanbobrowski.com',
      'https://portfolio-frontend-719818228386.us-central1.run.app',
      'http://localhost:5173',
    ],
    credentials: true,
  })
);

app.use(express.json({ limit: '10kb' }));

app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

app.get('/api/status', (req, res) => {
  return res.json({ ok: true, message: 'Backend running' });
});

app.use('/api/ask-stefan', askStefanRoute);
app.use('/api/skills', skillsRoute);
app.use('/api/projects', projectsRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));
