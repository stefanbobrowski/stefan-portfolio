import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

console.log('🚀 Frontend container starting…');

const distPath = path.join(__dirname, 'dist');
console.log('📂 Serving dist from:', distPath);

app.use(express.static(distPath));

// NEW EXPRESS 5 WILDCARD SYNTAX
app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`🔥 Frontend running on port ${port}`);
});
