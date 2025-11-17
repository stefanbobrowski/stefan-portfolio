const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

console.log('🚀 Frontend container starting…');

const distPath = path.join(__dirname, 'dist');
console.log('📂 Serving dist from:', distPath);

// Serve static assets
app.use(express.static(distPath));

// Express 5 wildcard route
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`🔥 Frontend running on port ${port}`);
});
