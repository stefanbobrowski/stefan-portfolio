import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

console.log('💡 Starting frontend container...');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('📁 __dirname = ', __dirname);
console.log('📁 Serving dist from: ', path.join(__dirname, 'dist'));

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  console.log('➡️  Serving index.html');
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`🚀 Frontend running on port ${port}`);
});
