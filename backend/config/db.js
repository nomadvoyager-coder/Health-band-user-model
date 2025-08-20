const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "hospital_tracking",
  password: "1234",
  port: 5432,
});

module.exports = pool;

pool.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('DB Connection Error:', err));

module.exports = pool;
