const { insertTag, getAll } = require("../service/tag.service");

const addTag = async (ctx, next) => {
  const { name } = ctx.request.body;
  try {
    const result = await insertTag(name);
    console.log("result", result);
    if (result.affectedRows === 1) {
      ctx.app.emit("success", "", ctx);
    }
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      ctx.app.emit("error", "DATA_EXIST", ctx);
      return;
    }

    ctx.app.emit("error", "SYSTEM_ERROR", ctx);
  }
};

const getAllTag = async (ctx, next) => {
  try {
    const result = await getAll();
    ctx.app.emit("success", result, ctx);
  } catch (err) {
    ctx.app.emit("error", "SYSTEM_ERROR", ctx);
  }
};

module.exports = {
  addTag,
  getAllTag,
};
