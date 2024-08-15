// db.js
const MySQLDatabase = require("./mysql");

class Database {
  constructor(config) {
    this.config = config;
    this.dbInstance = null;
    this.type = config.type;
  }

  async connect() {
    delete this.config.type;
    switch (this.type) {
      case "mysql":
        this.dbInstance = new MySQLDatabase(this.config);
        break;
      case "sqlite":
        break;
      default:
        throw new Error("Unsupported database type");
    }

    await this.dbInstance.connect();
  }

  async query(sql, params) {
    if (!this.dbInstance) {
      throw new Error("Database not connected");
    }
    return await this.dbInstance.query(sql, params);
  }

  async close() {
    if (this.dbInstance) {
      await this.dbInstance.close();
    }
  }
}

module.exports = Database;
