const { getInfo, getStore, updateCore } = require("../service/core.service");
const { getStoreInfo } = require("../service/store.service");
const getCore = async (ctx, next) => {
  try {
    const result = await getInfo();
    ctx.app.emit("success", result, ctx);
  } catch (err) {
    console.log("err", err);
    ctx.app.emit("error", "SYSTEM_ERROR", ctx);
  }
};

const getSoftWare = async (ctx, next) => {
  try {
    console.log("getSoftWare");
    const result = await getStore();
    ctx.app.emit("success", result, ctx);
  } catch (err) {
    ctx.app.emit("error", "SYSTEM_ERROR", ctx);
  }
};

const modifyCore = async (ctx, next) => {
  const { id, resource_id, version, update_description, store_id } =
    ctx.request.body;

  try {
    const resource = await getStoreInfo(resource_id);
    if (!resource.length) {
      ctx.app.emit("error", "PAYLOAD_ERROR", ctx);
      return;
    }

    const result = await updateCore({
      id,
      resource_id,
      version,
      update_description,
    });

    if (result.affectedRows === 1) {
      ctx.app.emit("success", "", ctx);
    } else {
      ctx.app.emit("error", "SYSTEM_ERROR", ctx);
    }
  } catch (err) {
    console.log("err", err);
    ctx.app.emit("error", "SYSTEM_ERROR", ctx);
  }
};

module.exports = {
  getCore,
  modifyCore,
  getSoftWare,
};
