const { mysql } = require("../db/index");

const getAll = async () => {
  const SQL = `SELECT id,name FROM tag WHERE is_delete = 0`;
  const result = await mysql.query(SQL);
  return result;
};

const insertTag = async (name) => {
  const SQL = `INSERT INTO tag (name) VALUES (?)`;
  const result = await mysql.query(SQL, [name]);
  return result;
};

const getTagInfo = async (id, is_delete = 0) => {
  const SQL = `SELECT * FROM tag WHERE id = ? AND is_delete = ?`;
  const result = await mysql.query(SQL, [id, is_delete]);
  return result;
};

module.exports = {
  insertTag,
  getAll,
  getTagInfo,
};
