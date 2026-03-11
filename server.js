// Load environment variables FIRST — before anything else
require('dotenv').config();

const express = require('express');
const path    = require('path');
const routes  = require('./routes/index');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve everything in the public/ folder (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);
});
