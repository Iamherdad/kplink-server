const { mysql } = require("../db/index");

const insertStart = async (data) => {
  const table = "operate_log_start";
  const insertSql = `
    INSERT INTO ${table} ( app_id, num) 
    VALUES (?, ?)
    ON DUPLICATE KEY UPDATE num = num + VALUES(num)
  `;

  try {
    for (const log of data) {
      await mysql.query(insertSql, [log.app_id, log.num]);
    }
    console.log("Logs inserted/updated successfully.");
  } catch (error) {
    console.error("Error inserting/updating logs:", error);
  }
};

module.exports = {
  insertStart,
};
