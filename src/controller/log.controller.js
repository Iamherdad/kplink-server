const { insertStart } = require("../service/log.service");

const addStartLog = async (ctx, next) => {
  const { data } = ctx.request.body;

  try {
    const res = await insertStart(data);
    ctx.app.emit("success", {}, ctx);
  } catch (err) {
    ctx.app.emit("error", "SYSTEM_ERROR", ctx);
  }
};

module.exports = {
  addStartLog,
};
