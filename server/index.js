require('dotenv').config();
const express = require('express');
const compression = require('compression');
const axios = require('axios');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

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

// Routes
// Get Requests

app.get('/', (req, res) => {
  let endpointUrl = '';

  var config = {
    method: 'get',
    url: endpointUrl,
    headers: {
      contentType: 'application/json',
    },
  };

  axios(config)
    .then(function (response) {
      res.send(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
});

// Starts Server on Specified Port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
