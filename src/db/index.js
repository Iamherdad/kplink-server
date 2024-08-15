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

const db = new Database(dbConfig);

const createTables = async (tabs) => {
  console.log(tabs);
  for (let i = 0; i < tabs.length; i++) {
    try {
      await db.query(tabs[i]);
      console.log(`Table created successfully`);
    } catch (err) {
      console.log(`Table created failed`);
    }
  }
};

(async () => {
  try {
    await db.connect();

    await createTables(tables);
  } catch (error) {
    console.error("Database error:", error);
  } finally {
  }
})();

module.exports = db;
