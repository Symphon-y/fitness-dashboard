require('dotenv').config();
const express = require('express');
const compression = require('compression');
const axios = require('axios');
const path = require('path');
const db = require('./db');
const app = express();
const port = process.env.PORT || 5001;

// Compression
app.use(compression());
// Body Data
app.use(express.json());
// Serves Static Files
app.use(express.static(path.join(__dirname, '../build')));
// Custom Request Logging Middleware
app.use((req, res, next) => {
  console.log(
    `*=== \x1b[34mNew Request Logged:\x1b[0m Type: \x1b[33m${req.method}\x1b[0m REQUEST, URL: \x1b[33m${req.url}\x1b[0m ===*`
  );
  next();
});

app.get('/test', (req, res, next) => {
  console.log('get /');
  db.query('SELECT * FROM lift_entry', (err, result) => {
    if (err) {
      return next(err);
    }
    res.send(result.rows);
  });
});

// Starts Server on Specified Port
app.listen(port, () => {
  console.log(`Serving Build and Listening on port ${port}`);
});

module.exports = app;
