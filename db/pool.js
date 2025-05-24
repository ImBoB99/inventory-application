require('dotenv').config();
const { Pool } = require("pg")

// All of the following properties should be read from environment variables
// We're hardcoding them here for simplicity

module.exports = new Pool({
  host: process.env.DATABASE_HOST, // or wherever the db is hosted
  user: process.env.DATABASE_USER,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT // The default port
})