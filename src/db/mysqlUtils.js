const { mysql: db } = require("./index");

const query = async (sql, params) => {
  const result = await db.query(sql, params);
  return result;
};

const insert = async (table, data) => {
  const keys = Object.keys(data).join(", ");
  const values = Object.values(data);
  const placeholders = values.map(() => "?").join(", ");
  const sql = `INSERT INTO ${table} (${keys}) VALUES (${placeholders})`;
  return await query(sql, values);
};

// const read = async (table, conditions = {}, field = "*") => {
//   const keys = Object.keys(conditions);
//   const values = Object.values(conditions);
//   const whereClause = keys.length
//     ? `WHERE ${keys.map((key) => `${key} = ?`).join(" AND ")}`
//     : "";
//   const fieldClause = field === "*" ? field : field.join(", ");
//   const sql = `SELECT ${fieldClause} FROM ${table} ${whereClause}`;
//   console.log("sql", sql);
//   return await query(sql, values);
// };

const read = async (table, conditions = {}, field = "*", joins = []) => {
  const keys = Object.keys(conditions);
  const values = Object.values(conditions);
  const whereClause = keys.length
    ? `WHERE ${keys.map((key) => `${key} = ?`).join(" AND ")}`
    : "";
  const fieldClause = field === "*" ? field : field.join(", ");

  // 构建 JOIN 子句
  const joinClause = joins
    .map((join) => {
      const { type, table, on } = join;
      return `${type.toUpperCase()} JOIN ${table} ON ${on}`;
    })
    .join(" ");

  const sql = `SELECT ${fieldClause} FROM ${table} ${joinClause} ${whereClause}`;
  console.log("sql", sql);
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
  insert,
  read,
  update,
  remove,
  query,
};
