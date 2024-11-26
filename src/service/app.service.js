const { read, query } = require("../db/mysqlUtils");
const { mysql } = require("../db/index");

const getAppList = async () => {
  const SQL = `
    SELECT 
      app.id,
      app.name,
      app.description,
      app.icon,
      app.resource_id,
      store.app_resource,
      store.start_path,
      store.start_type,
      store.version as resource_version,
      store.name as resource_name,
      app.version,
      app.update_desc,
      app.create_at,
      app.update_at,
      IFNULL(
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'url', app_preview.url
          )
        ), JSON_ARRAY()
      ) as preview_images
    FROM app
    LEFT JOIN store ON app.resource_id = store.id
    LEFT JOIN app_preview ON app.id = app_preview.app_id
    WHERE app.is_delete = 0
    GROUP BY app.id, store.id
  `;

  try {
    const result = await query(SQL);

    return result;
  } catch (err) {
    console.log("err", err);
    throw err;
  }
};

const getInfo = async (id) => {
  const SQL = `
    SELECT 
      app.id,
      app.name,
      app.description,
      app.icon,
      app.resource_id,
      store.app_resource,
      store.start_path,
      store.start_type,
      store.version as resource_version,
      store.name as resource_name,
      app.version,
      app.update_desc,
      app.create_at,
      app.update_at,
      IFNULL(
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'url', app_preview.url
          )
        ), JSON_ARRAY()
      ) as preview_images
    FROM app
    LEFT JOIN store ON app.resource_id = store.id
    LEFT JOIN app_preview ON app.id = app_preview.app_id
    WHERE app.id = ?
    GROUP BY app.id, store.id
  `;

  try {
    const result = await query(SQL, [id]);
    return result[0];
  } catch (err) {
    throw err;
  }
};

const insertApp = async (data) => {
  const {
    id: uuid,
    name,
    description,
    icon,
    resource_id,
    version,
    update_desc,
    preview_images,
  } = data;
  console.log("data", preview_images);
  const INSERT_APP_SQL = `INSERT INTO app (id, name, description, icon, resource_id, , version, update_desc) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  // 构建批量插入的 SQL 语句和参数
  const INSERT_APP_PREVIEW_SQL = `INSERT INTO app_preview (app_id, url) VALUES ${preview_images
    .map(() => "(?, ?)")
    .join(", ")}`;
  const previewParams = preview_images.flatMap((url) => [uuid, url]);
  const content = await mysql.dbConnect;
  try {
    // 开启事务

    await content.beginTransaction();

    // 插入 app 表
    await content.query(INSERT_APP_SQL, [
      uuid,
      name,
      description,
      icon,
      resource_id,
      version,
      update_desc,
    ]);

    // 插入 app_preview 表
    if (preview_images.length > 0) {
      await content.query(INSERT_APP_PREVIEW_SQL, previewParams);
    }

    // 提交事务
    await content.commit();
    return { success: true };
  } catch (err) {
    console.log("err", err);
    // 回滚事务
    await content.rollback();
    throw err;
  }
};

const updateApp = async (data) => {
  const {
    id,
    name,
    description,
    icon,
    resource_id,
    version,
    update_description,
    preview_images,
  } = data;

  const UPDATE_APP_SQL = `UPDATE app SET name = ?, description = ?, icon = ?, resource_id = ?, version = ?, update_desc = ? WHERE id = ?`;
  const DELETE_APP_PREVIEW_SQL = `DELETE FROM app_preview WHERE app_id = ?`;
  const INSERT_APP_PREVIEW_SQL = `INSERT INTO app_preview (app_id, url) VALUES ${preview_images
    .map(() => "(?, ?)")
    .join(", ")}`;

  const previewParams = preview_images.flatMap((url) => [id, url]);
  const content = await mysql.dbConnect;
  try {
    await content.beginTransaction();

    await content.query(UPDATE_APP_SQL, [
      name,
      description,
      icon,
      resource_id,
      version,
      update_description,
      id,
    ]);

    await content.query(DELETE_APP_PREVIEW_SQL, [id]);

    if (preview_images.length > 0) {
      console.log("444");
      console.log("previewParams", previewParams);
      console.log("INSERT_APP_PREVIEW_SQL", INSERT_APP_PREVIEW_SQL);
      await content.query(INSERT_APP_PREVIEW_SQL, previewParams);
    }

    await content.commit();
    return { success: true };
  } catch (err) {
    await content.rollback();
    throw err;
  }
};

const deleteApp = async (id) => {
  const SQL = `UPDATE app SET is_delete = 1 WHERE id = ?`;

  try {
    const result = await query(SQL, [id]);
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAppList,
  insertApp,
  updateApp,
  deleteApp,
  getInfo,
};
