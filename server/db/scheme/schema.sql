DROP DATABASE IF EXISTS fitness_dashboard;
CREATE DATABASE fitness_dashboard;

\c fitness_dashboard;


-- User --
CREATE TABLE user_table (
  id SERIAL PRIMARY KEY,
  uid VARCHAR(500) UNIQUE,
  created_at TIMESTAMP,
  username VARCHAR(500)
);

-- Body Composition --
CREATE TABLE body_composition (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(500),
  created_at TIMESTAMP,
  weight VARCHAR(10),
  goal_weight VARCHAR(10),
  body_fat VARCHAR(10),
  FOREIGN KEY (user_id) REFERENCES user_table (uid)
);

-- Lift --
CREATE TABLE lift (
  id SERIAL PRIMARY KEY,
  lift_name VARCHAR(500),
  upper_or_lower VARCHAR(500),
  push_or_pull VARCHAR(500),
  compound_or_isolation VARCHAR(500)
);

-- User Lifts --
CREATE TABLE user_lifts (
  id VARCHAR(500) UNIQUE,
  user_id VARCHAR(500),
  lift_id INTEGER,
  orm  smallint,
  selected_days TEXT [],
  FOREIGN KEY (lift_id) REFERENCES lift (id),
  FOREIGN KEY (user_id) REFERENCES user_table (uid)
);

-- Lift Progress --
CREATE TABLE lift_progress (
  id VARCHAR(500) UNIQUE,
  user_id VARCHAR(500),
  lift_id INTEGER,
  target_met BOOLEAN,
  target_stage SMALLINT,
  days_missed SMALLINT,
  FOREIGN KEY (lift_id) REFERENCES lift (id),
  FOREIGN KEY (user_id) REFERENCES user_table (uid)
);

-- Lift Entry --
CREATE TABLE lift_entry (
  id SERIAL PRIMARY KEY,
  lift_id INTEGER NOT NULL,
  user_id VARCHAR(500),
  created_at TIMESTAMP,
  wu_weight_1 VARCHAR(500),
  wu_reps_1 VARCHAR(500),
  wu_weight_2 VARCHAR(500),
  wu_reps_2 VARCHAR(500),
  wu_weight_3 VARCHAR(500),
  wu_reps_3 VARCHAR(500),
  ws_weight_1 VARCHAR(500),
  ws_reps_1 VARCHAR(500),
  ws_weight_2 VARCHAR(500),
  ws_reps_2 VARCHAR(500),
  ws_weight_3 VARCHAR(500),
  ws_reps_3 VARCHAR(500),
  FOREIGN KEY (lift_id) REFERENCES lift (id),
  FOREIGN KEY (user_id) REFERENCES user_table (uid)
);


CREATE INDEX user_index
ON user_table (id, uid);

CREATE INDEX body_composition_index
ON body_composition (id, user_id);

CREATE INDEX lift_index
ON lift (id);

