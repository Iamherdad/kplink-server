// index.js

const { tables } = require("./sql_table");
const Mysql = require("./mysql");
const Redis = require("./redis");

const dbConfig = {
  host: "115.159.83.245",
  port: 3306,
  user: "root",
  password: "qq1401446942",
  database: "kp_link",
  connectionLimit: 10,
};

const mysql = new Mysql(dbConfig);
const redis = new Redis({ host: "redis", port: 6378 });

const createTables = async (tabs) => {
  for (let i = 0; i < tabs.length; i++) {
    try {
      await mysql.query(tabs[i]);
      console.log(`Table created successfully`);
    } catch (err) {
      console.log(`Table created failed`, tabs[i], err);
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
  redis: redis,
};
