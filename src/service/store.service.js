const { query } = require("../db/mysqlUtils");

const getstores = async () => {
  const stores = await query("SELECT * FROM store");
  return stores;
};

const insertStore = async (store) => {
  const result = await query("INSERT INTO store SET ?", store);
  return result;
};

module.exports = {
  getstores,
};
