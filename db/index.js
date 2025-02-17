require("dotenv").config();
const { Pool } = require("pg");

// Use a connection pool to manage PostgreSQL connections
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	statement_timeout: 60000,
	connectionTimeoutMillis: 10000, // 10 seconds
	idleTimeoutMillis: 30000, // 30 seconds
});

module.exports = {
	query: (text, params) => pool.query(text, params),
};
