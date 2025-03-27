const { insertStore, getStoreList } = require("../service/store.service");
const { getTagInfo } = require("../service/tag.service");
const { redis } = require("../db/index.js");
const addStore = async (ctx, next) => {
  console.log("11");
  const { tag_id, description, start_path, version, file_id } =
    ctx.request.body;

  try {
    const resource = await redis.get(file_id);

    if (!resource) {
      ctx.app.emit("error", "FILE_EXPIRY", ctx);
      return;
    }

    const app_resource = resource;
    const start_type =
      start_path.split(".").pop() === "exe" ? "exe" : "webview";
    console.log("app_resource", start_path, app_resource, start_type);
    const tag = await getTagInfo(tag_id);
    if (!tag.length) {
      ctx.app.emit("error", "PAYLOAD_ERROR", ctx);

      return;
    }

    const result = await insertStore({
      tag_id,
      description,
      app_resource,
      start_path,
      start_type,
      version,
      name: tag[0].name,
    });
    console.log("result", result);
    if (result.affectedRows === 1) {
      ctx.app.emit("success", "", ctx);
    } else {
      ctx.app.emit("error", "SYSTEM_ERROR", ctx);
    }
  } catch (err) {
    console.log("err", err);
    if (err.code === "ER_DUP_ENTRY") {
      ctx.app.emit("error", "DATA_EXIST", ctx);
      return;
    }

    ctx.app.emit("error", "PAYLOAD_ERROR", ctx);
  }
};

const getstores = async (ctx, next) => {
  try {
    const result = await getStoreList();
    ctx.app.emit("success", result, ctx);
  } catch (err) {
    ctx.app.emit("error", "SYSTEM_ERROR", ctx);
  }
};

const updateStore = async (ctx, next) => {
  const { name, description, app_resource, start_path, start_type, version } =
    ctx.reqyest.body;

  const SQL1 = `SELECT * FROM store WHERE name = ? ADN is_delete = 0 ADD version = ?`;

  const store = await db.query(SQL1, [name, version]);

  if (store.length > 0) {
    ctx.body = {
      code: 1,
      msg: "store already exists",
    };
    return;
  }

  const SQL2 = `UPDATE store SET ? WHERE id = ?`;

  const result = await db.query(SQL2, {
    name,
    description,
    app_resource,
    start_path,
    start_type,
    version,
  });

  ctx.body = {
    code: 0,
    data: result,
  };
};

module.exports = {
  addStore,
  getstores,
};
