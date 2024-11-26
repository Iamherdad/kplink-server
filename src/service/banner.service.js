const { mysql } = require("../db/index");
const getAll = async () => {
  const SQL = `SELECT * FROM banner`;
  try {
    const result = await mysql.query(SQL);
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAll,
};
