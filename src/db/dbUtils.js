const db = require("./index");

const query = async (sql, params) => {
  const [results] = await db.query(sql, params);
  return results;
};

const create = async (table, data) => {
  const keys = Object.keys(data).join(", ");
  const values = Object.values(data);
  const placeholders = values.map(() => "?").join(", ");
  const sql = `INSERT INTO ${table} (${keys}) VALUES (${placeholders})`;
  return await query(sql, values);
};

const read = async (table, conditions = {}) => {
  const keys = Object.keys(conditions);
  const values = Object.values(conditions);
  const whereClause = keys.length
    ? `WHERE ${keys.map((key) => `${key} = ?`).join(" AND ")}`
    : "";

  const sql = `SELECT * FROM ${table} ${whereClause}`;
  return await query(sql, values);
};

const update = async (table, data, conditions) => {
  const dataKeys = Object.keys(data);
  const dataValues = Object.values(data);
  const setClause = dataKeys.map((key) => `${key} = ?`).join(", ");

  const conditionKeys = Object.keys(conditions);
  const conditionValues = Object.values(conditions);
  const whereClause = conditionKeys.map((key) => `${key} = ?`).join(" AND ");

  const sql = `UPDATE ${table} SET ${setClause} WHERE ${whereClause}`;
  return await query(sql, [...dataValues, ...conditionValues]);
};

const remove = async (table, conditions) => {
  const keys = Object.keys(conditions);
  const values = Object.values(conditions);
  const whereClause = keys.map((key) => `${key} = ?`).join(" AND ");

  const sql = `DELETE FROM ${table} WHERE ${whereClause}`;
  return await query(sql, values);
};

module.exports = {
  create,
  read,
  update,
  remove,
  query,
};
