const { read, create, update, remove } = require("./mysqlUtils");

const getApps = async () => {
  return await read("app");
};

const createApp = async (app) => {
  return await create("app", app);
};

const updateApp = async (app, conditions) => {
  return await update("app", app, conditions);
};

const removeApp = async (conditions) => {
  return await remove("app", conditions);
};

const getCore = async () => {
  return await read("core");
};

const createCore = async (core) => {
  return await create("core", core);
};

const updateCore = async (core, conditions) => {
  return await update("core", core, conditions);
};

const removeCore = async (conditions) => {
  return await remove("core", conditions);
};

module.exports = {
  getApps,
  createApp,
  updateApp,
  removeApp,
  getCore,
  createCore,
  updateCore,
  removeCore,
};
