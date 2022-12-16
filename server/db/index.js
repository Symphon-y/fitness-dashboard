require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.PGHOST || 'localhost',
  port: process.env.PGPORT || 5432,
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || 'postgres',
  database: process.env.PGDATABASE || 'postgres',
  max: process.env.PGMAX || '50',
  idleTimeoutMillis: process.env.PGIDLETIMEOUT || 30000,
  statement_timeout: process.env.PGSTATEMENT_TIMEOUT || 10000,
  idleTimeout: process.env.PGIDLETIMEOUT || 10000,
  connectTimeout: process.env.PGCONNECTTIMEOUT || 10000,
  timezone: process.env.PGTIMEZONE || '+00:00',
  acquireTimeout: process.env.PGACQUIRETIMEOUT || 30000,
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
