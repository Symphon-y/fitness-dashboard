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

app.post('/lift-entry', (req, res, next) => {
  const keys = Object.keys(req.body);
  keys.forEach((key) => {
    const body = req.body[key];
    db.query(
      'INSERT INTO lift_entry(lift_id, user_id, created_at, wu_weight_1, wu_reps_1, wu_weight_2, wu_reps_2, wu_weight_3, wu_reps_3, ws_weight_1, ws_reps_1, ws_weight_2, ws_reps_2, ws_weight_3, ws_reps_3) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)',
      [
        body.lift_id,
        body.user_id,
        body.created_at,
        body.wu_weight_1,
        body.wu_reps_1,
        body.wu_weight_2,
        body.wu_reps_2,
        body.wu_weight_3,
        body.wu_reps_3,
        body.ws_weight_1,
        body.ws_reps_1,
        body.ws_weight_2,
        body.ws_reps_2,
        body.ws_weight_3,
        body.ws_reps_3,
      ],
      (err, result) => {
        if (err) {
          return next(err);
        }
      }
    );
  });
  res.send('success');
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

app.get('/todays-lift-progress/:id/:lift_list', (req, res, next) => {
  let resultObject = {};
  const conditions = req.params.lift_list.split(',');
  db.query(
    'SELECT * FROM lift_progress WHERE user_id = $1',
    [req.params.id],
    (err, result) => {
      if (err) {
        return next(err);
      }
      // console.log(result.rows);
      conditions.forEach((todaysLift, index) => {
        result.rows.forEach((lift, index) => {
          // const liftId = Number(lift.lift_id);
          // console.log(index);
          if (Number(lift.lift_id) === Number(todaysLift)) {
            resultObject[lift.lift_id] = lift;
          }
        });
      });
      res.send(JSON.stringify(result.rows));
    }
  );
});

// Get a users lift progress based on liftprogress id
app.get('/lift_progress/:lift_id', (req, res, next) => {
  db.query(
    'SELECT * FROM lift_progress WHERE LOWER(id)=LOWER($1)',
    [req.params.lift_id],
    (err, result) => {
      if (err) {
        return next(err);
      }
      res.send(JSON.stringify(result.rows));
    }
  );
});

// Get  a users latest-lift for selected lift
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
  console.log(req.params.id, req.params.lift_id);
  db.query(
    'SELECT * FROM lift_entry WHERE LOWER(user_id)=LOWER($1) AND lift_id=($2) ORDER BY created_at ASC',
    [req.params.id, req.params.lift_id],
    (err, result) => {
      if (err) {
        return next(err);
      }
      console.log(result.rows);
      res.send(JSON.stringify(result.rows));
    }
  );
});

// Starts Server on Specified Port
app.listen(port, () => {
  console.log(`Serving Build and Listening on port ${port}`);
});

module.exports = app;
