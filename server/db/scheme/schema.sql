DROP DATABASE IF EXISTS fitness_dashboard;
CREATE DATABASE fitness_dashboard;

\c fitness_dashboard;


-- User --
CREATE TABLE user (
  id SERIAL PRIMARY KEY,
  uid VARCHAR(500),
  created_at TIMESTAMP,
  username VARCHAR(500),
  login BOOLEAN DEFAULT FALSE
);

-- Body Composition --
CREATE TABLE body_composition (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP,
  weight VARCHAR(10),
  goalweight VARCHAR(10),
  bodyfat VARCHAR(10),
  FOREIGN KEY (user_id) REFERENCES user (id)
);

-- Lift --
CREATE TABLE lift (
  id SERIAL PRIMARY KEY,
  lift_name VARCHAR(500),
  upper_or_lower VARCHAR(500),
  push_or_pull VARCHAR(500),
  compound_or_isolation VARCHAR(500),
);

-- Lift Entry --
CREATE TABLE lift_entry (
  id SERIAL PRIMARY KEY,
  lift_id INTEGER NOT NULL,
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
  FOREIGN KEY (lift_id) REFERENCES lift (id)
);


CREATE INDEX user_index
ON user (id, uid);

CREATE INDEX body_composition_index
ON body_composition (id, user_id);

CREATE INDEX lift_index
ON lift (id, user_id);

CREATE INDEX lift_entry_index
ON lift_entry (id, lift_id);