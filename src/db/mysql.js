// mysql.js
const mysql = require("mysql2/promise");

class MySQLDatabase {
  constructor(config) {
    this.config = config;
    this.pool = null;
  }

  async connect() {
    this.pool = mysql.createPool(this.config);
  }

  async query(sql, params) {
    const [rows] = await this.pool.execute(sql, params);
    return rows;
  }

  async close() {
    await this.pool.end();
  }
}

module.exports = MySQLDatabase;
