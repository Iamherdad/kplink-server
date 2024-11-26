// mysql.js
const mysql = require("mysql2/promise");

class MySQLDatabase {
  constructor(config) {
    this.config = config;
    this.pool = null;
    this.dbConnect = null;
  }

  async connect() {
    this.pool = mysql.createPool(this.config);
    this.dbConnect = this.pool.getConnection();
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
