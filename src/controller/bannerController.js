const { getAll } = require("../service/banner.service");

const getBanner = async (ctx, next) => {
  try {
    const result = await getAll();
    ctx.app.emit("success", result, ctx);
  } catch (err) {
    ctx.app.emit("error", "SYSTEM_ERROR", ctx);
  }
};

module.exports = {
  getBanner,
};
