import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import askStefanRoute from './routes/ask-stefan.js';
import skillsRoute from './routes/skills.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/status', (req, res) => {
  return res.json({ ok: true, message: 'Backend running' });
});

app.use('/api/ask-stefan', askStefanRoute);
app.use('/api/skills', skillsRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));
