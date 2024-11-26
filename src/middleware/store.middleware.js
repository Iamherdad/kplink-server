const joi = require("joi");

const addStoreSchema = joi.object({
  description: joi.string().required().min(1).max(255),
  file_id: joi.string().required().min(1).max(255),
  start_path: joi.string().required().min(1).max(255),
  tag_id: joi.number().required().min(1),
  version: joi.string().required().min(5).max(5),
  // app_resource: joi.string().required().min(1).max(255),

  // start_type: joi.string().valid("exe", "webview").required(),
});

const verifyAddStore = async (ctx, next) => {
  const { tag_id, description, file_id, start_path, version } =
    ctx.request.body;

  const result = addStoreSchema.validate({
    tag_id,
    description,
    file_id,
    start_path,
    version,
  });

  if (result.error) {
    console.log("result.error", result.error);
    ctx.app.emit("error", "PAYLOAD_ERROR", ctx);
    return;
  }
  await next();
};

module.exports = {
  verifyAddStore,
};
