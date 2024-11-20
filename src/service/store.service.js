const { query } = require("../db/mysqlUtils");

const insertStore = async (data) => {
  const { tag_id, description, app_resource, start_path, start_type, version } =
    data;
  const SQL = `INSERT INTO store (tag_id, description, app_resource, start_path, start_type, version) VALUES (?, ?, ?, ?, ?, ?)`;
  try {
    const result = await query(SQL, [
      tag_id,
      description,
      app_resource,
      start_path,
      start_type,
      version,
    ]);
    return result;
  } catch (err) {
    throw err;
  }
};

const getStoreList = async () => {
  const SQL = `
    SELECT 
      t.id as t_id, 
      t.name as t_name, 
      COUNT(s.id) as count,
      IFNULL(
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', s.id,
            'description', s.description,
            'app_resource', s.app_resource,
            'start_path', s.start_path,
            'start_type', s.start_type,
            'version', s.version
          )
        ), JSON_ARRAY()
      ) as apps
    FROM tag t
    LEFT JOIN store s ON t.id = s.tag_id
    WHERE t.is_delete = 0
    GROUP BY t.id, t.name
  `;

  try {
    const result = await query(SQL);
    // 过滤掉 apps 中包含 null 值的对象
    const filteredResult = result.map((row) => {
      if (row.count === 0) {
        row.apps = [];
      } else {
        row.apps = row.apps.filter((app) => app.id !== null);
      }
      return row;
    });
    return filteredResult;
  } catch (err) {
    throw err;
  }
};
module.exports = {
  insertStore,
  getStoreList,
};
