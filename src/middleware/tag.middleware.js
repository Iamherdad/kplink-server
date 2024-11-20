const joi = require("joi");

const addTagSchema = joi.object({
  name: joi.string().required().min(1).max(25),
});

const verifyAddTag = async (ctx, next) => {
  const { name } = ctx.request.body;
  const result = addTagSchema.validate({ name });
  if (result.error) {
    ctx.app.emit("error", "PAYLOAD_ERROR", ctx);
    return;
  }

  await next();
};

module.exports = {
  verifyAddTag,
};
