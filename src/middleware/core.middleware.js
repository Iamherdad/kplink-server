const joi = require("joi");

const modifyAppSchema = joi.object({
  id: joi.string().required().min(1).max(32),

  resource_id: joi.number().required(),
  version: joi.string().required().min(5).max(5),
  update_description: joi.string().required().min(1).max(255),
});

const verifyModifyCore = async (ctx, next) => {
  const { id, resource_id, version, update_description } = ctx.request.body;

  const result = modifyAppSchema.validate({
    id,
    resource_id,
    version,
    update_description,
  });

  if (result.error) {
    console.log("result.error", result.error);
    ctx.app.emit("error", "PAYLOAD_ERROR", ctx);
    return;
  }
  await next();
};

module.exports = {
  verifyModifyCore,
};
