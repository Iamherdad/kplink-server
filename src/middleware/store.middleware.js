const joi = require("joi");

const addStoreSchema = joi.object({
  tag_id: joi.number().required().min(1),
  description: joi.string().required().min(1).max(255),
  app_resource: joi.string().required().min(1).max(255),
  start_path: joi.string().required().min(1).max(255),
  start_type: joi.string().valid("exe", "webview").required(),
  version: joi.number().required().min(0).max(9999999999),
});

const verifyAddStore = async (ctx, next) => {
  const { tag_id, description, app_resource, start_path, start_type, version } =
    ctx.request.body;

  const result = addStoreSchema.validate({
    tag_id,
    description,
    app_resource,
    start_path,
    start_type,
    version,
  });

  if (result.error) {
    ctx.app.emit("error", "PAYLOAD_ERROR", ctx);
    return;
  }
  await next();
};

module.exports = {
  verifyAddStore,
};
