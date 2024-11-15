// index.js
const Database = require("./db");
const { tables } = require("./sql_table");

const dbConfig = {
  type: "mysql", // or 'sqlite'
  host: "115.159.83.245",
  port: 3306,
  user: "root",
  password: "qq1401446942",
  database: "kp_link",
  connectionLimit: 10,
};

const mysql = new Database(dbConfig);
const redis = new Database({ type: "redis", host: "127.0.0.1", port: 6378 });

const createTables = async (tabs) => {
  for (let i = 0; i < tabs.length; i++) {
    try {
      await mysql.query(tabs[i]);
      console.log(`Table created successfully`);
    } catch (err) {
      console.log(`Table created failed`);
    }
  }
};

(async () => {
  try {
    await mysql.connect();
    console.log("mysql connected");
    await createTables(tables);
    await redis.connect();
    console.log("redis connected");
  } catch (error) {
    console.error("Database error:", error);
  } finally {
  }
})();

module.exports = {
  mysql,
  redis,
};
