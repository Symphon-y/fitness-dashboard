require('dotenv').config();
const express = require('express');
const compression = require('compression');
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

// Update or Create User Lift Entry
app.post('/user-lifts', (req, res, next) => {
  db.query(
    'INSERT INTO user_lifts (id, user_id, lift_id, orm, selected_days) VALUES($1, $2, $3, $4, $5)  ON CONFLICT (id) DO  UPDATE SET orm = $4, selected_days = $5',
    [
      req.body.id,
      req.body.user_id,
      req.body.lift_id,
      req.body.orm,
      req.body.selected_days,
    ],
    (err, result) => {
      if (err) {
        return next(err);
      }
      res.send(JSON.stringify(result.rows));
    }
  );
});

// Update or Create Lift Progress
app.post('/lift-progress', (req, res, next) => {
  db.query(
    'INSERT INTO lift_progress (id, user_id, lift_id, target_met, target_stage, days_missed) VALUES($1, $2, $3, $4, $5, $6)  ON CONFLICT (id) DO  UPDATE SET target_met = $4, target_stage = $5, days_missed = $6',
    [
      req.body.id,
      req.body.user_id,
      req.body.lift_id,
      req.body.target_met,
      req.body.target_stage,
      req.body.days_missed,
    ],
    (err, result) => {
      if (err) {
        return next(err);
      }
      res.send(JSON.stringify(result.rows));
    }
  );
});

// Get A Users Lift List
app.get('/user-lifts/:id', (req, res, next) => {
  db.query(
    'SELECT * FROM user_lifts WHERE user_id=($1)',
    [req.params.id],
    (err, result) => {
      if (err) {
        return next(err);
      }
      res.send(JSON.stringify(result.rows));
    }
  );
});

app.get('/latest-lift/:id/:lift_id', (req, res, next) => {
  db.query(
    'SELECT * FROM lift_entry WHERE LOWER(user_id)=LOWER($1) AND lift_id=($2) ORDER BY created_at DESC LIMIT 1',
    [req.params.id, req.params.lift_id],
    (err, result) => {
      if (err) {
        return next(err);
      }
      res.send(JSON.stringify(result.rows));
    }
  );
});

// Get list of available lifts
app.get('/available-lifts', (req, res, next) => {
  db.query('SELECT * FROM lift', (err, result) => {
    if (err) {
      return next(err);
    }
    res.send(JSON.stringify(result.rows));
  });
});

// Test Route
app.get('/test', (req, res, next) => {
  db.query('SELECT * FROM lift_entry', (err, result) => {
    if (err) {
      return next(err);
    }
    res.send(result.rows);
  });
});

// Get User by Id
app.get('/:id', (req, res, next) => {
  db.query(
    'SELECT * FROM user_table WHERE LOWER(uid)=LOWER($1)',
    [req.params.id],
    (err, result) => {
      if (err) {
        return next(err);
      }
      res.send(JSON.stringify(result.rows[0]));
    }
  );
});

// Get lift history by user id and lift id
app.get('/lifts/:id/:lift_id', (req, res, next) => {
  db.query(
    'SELECT * FROM lift_entry WHERE LOWER(user_id)=LOWER($1) AND lift_id=($2) ORDER BY created_at ASC',
    [req.params.id, req.params.lift_id],
    (err, result) => {
      if (err) {
        return next(err);
      }
      res.send(JSON.stringify(result.rows));
    }
  );
});

// Starts Server on Specified Port
app.listen(port, () => {
  console.log(`Serving Build and Listening on port ${port}`);
});

module.exports = app;
