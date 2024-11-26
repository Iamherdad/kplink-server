const { mysql } = require("../db/index");

const getInfo = async () => {
  const SQL = `
    SELECT 
      app.id,
      app.name,
      app.description,
      app.resource_id,
      app.version,
      app.update_desc,
      app.create_at,
      app.update_at,
      store.id as store_id,
      store.app_resource,
      store.start_path,
      store.start_type,
      store.version as resource_version,
      store.name as resource_name
    FROM core app
    LEFT JOIN store ON app.resource_id = store.id
    WHERE app.id = 'linkserver'
   
  `;
  try {
    const result = await mysql.query(SQL);
    return result;
  } catch (err) {
    throw err;
  }
};

const getStore = async () => {
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
            'version', s.version,
            'name', s.name

          )
        ), JSON_ARRAY()
      ) as apps
    FROM tag t
    LEFT JOIN store s ON t.id = s.tag_id
    WHERE t.is_delete = 0 AND t.name = 'linkserver'
    GROUP BY t.id, t.name
  `;
  try {
    const result = await mysql.query(SQL);
    return result;
  } catch (err) {
    throw err;
  }
};

const updateCore = async (data) => {
  const { id, resource_id, version, update_description } = data;
  const SQL = `UPDATE core SET resource_id = ?, version = ?, update_desc = ?, update_at = ? WHERE id = ?`;
  try {
    const result = await mysql.query(SQL, [
      resource_id,
      version,
      update_description,
      new Date(),
      id,
    ]);
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getInfo,
  getStore,
  updateCore,
};
