const {
  getAppList,
  insertApp,
  updateApp,
  deleteApp,
  getInfo,
} = require("../service/app.service");
const { v4: uuidv4 } = require("uuid");
const { getStoreInfo } = require("../service/store.service");
const getApps = async (ctx, next) => {
  try {
    const appList = await getAppList();

    ctx.app.emit("success", appList, ctx);
  } catch (err) {
    ctx.app.emit("error", "SYSTEM_ERROR", ctx);
  }
};

const getAppInfo = async (ctx, next) => {
  try {
    const { id } = ctx.query;
    const res = await getInfo(id);
    ctx.app.emit("success", res, ctx);
  } catch (err) {
    ctx.app.emit("error", "SYSTEM_ERROR", ctx);
  }
};

const addApp = async (ctx, next) => {
  const {
    name,
    description,
    icon,
    resource_id,
    version,
    update_description,
    preview_images,
  } = ctx.request.body;
  console.log(
    111,
    name,
    description,
    icon,
    resource_id,
    version,
    update_description,
    preview_images
  );

  try {
    const resource = await getStoreInfo(resource_id);

    if (!resource.length) {
      ctx.app.emit("error", "PAYLOAD_ERROR", ctx);
      return;
    }

    // const app_resource = resource[0].app_resource;
    // const start_type = resource[0].start_type;
    // const start_path = resource[0].start_path;

    const uuid = uuidv4().replace(/-/g, "");

    const data = {
      id: uuid,
      name,
      description,
      icon,
      resource_id,
      version,
      update_desc: update_description,
      preview_images: preview_images,
    };

    const result = await insertApp(data);
    ctx.app.emit("success", {}, ctx);
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      ctx.app.emit("error", "DATA_EXIST", ctx);
      return;
    }
    ctx.app.emit("error", "PAYLOAD_ERROR", ctx);
  }
};

const modifyApp = async (ctx, next) => {
  const {
    id,
    name,
    description,
    icon,
    resource_id,
    version,
    update_description,
    preview_images,
  } = ctx.request.body;

  const data = {
    id,
    name,
    description,
    icon,
    resource_id,
    version,
    update_description,
    preview_images,
  };

  try {
    const res = await updateApp(data);
    ctx.app.emit("success", {}, ctx);
  } catch (err) {
    ctx.app.emit("error", "SYSTEM_ERROR", ctx);
  }
};

const removeApp = async (ctx, next) => {
  const { id } = ctx.request.body;

  try {
    const res = await deleteApp(id);
    ctx.app.emit("success", {}, ctx);
  } catch (err) {
    ctx.app.emit("error", "SYSTEM_ERROR", ctx);
  }
};

module.exports = {
  getApps,
  addApp,
  modifyApp,
  removeApp,
  getAppInfo,
};
