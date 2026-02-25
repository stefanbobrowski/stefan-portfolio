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

// Middleware to redirect trailing slashes to non-trailing-slash versions
// This prevents Google from indexing the same content twice
app.use((req, res, next) => {
  // Skip redirects for files with extensions (css, js, etc.)
  if (req.path.match(/\.[a-zA-Z0-9]+$/)) {
    return next();
  }

  // Redirect /path/ to /path
  if (req.path.length > 1 && req.path.endsWith('/')) {
    const redirectPath = req.path.slice(0, -1);
    return res.redirect(
      301,
      redirectPath + (req.url.split('?')[1] ? '?' + req.url.split('?')[1] : '')
    );
  }

  next();
});

// Define valid routes for the SPA
const validRoutes = ['/', '/about', '/projects', '/skills', '/resume'];

// SPA fallback - serve index.html for valid routes, 404 for invalid ones
app.get('*', (req, res) => {
  const pathname = req.path;

  // Check if the route is valid
  if (validRoutes.includes(pathname)) {
    res.sendFile(path.join(distPath, 'index.html'));
  } else {
    // Return 404 for invalid routes - still serve index.html for SPA routing
    // but with 404 status code so Google doesn't index these pages
    res.status(404).sendFile(path.join(distPath, 'index.html'));
  }
});

app.listen(port, () => {
  console.log(`🔥 Frontend running on port ${port}`);
});
