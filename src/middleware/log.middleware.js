const joi = require("joi");

const addStartLogSchema = joi
  .array()
  .items(
    joi.object({
      app_id: joi.string().required(),
      num: joi.number().required(),
    })
  )
  .required();

const verifyAddStartLog = async (ctx, next) => {
  const { data } = ctx.request.body;

  const result = addStartLogSchema.validate(data);

  if (result.error) {
    console.log("result.error", result.error);
    ctx.app.emit("error", "PAYLOAD_ERROR", ctx);
    return;
  }

  await next();
};

module.exports = {
  verifyAddStartLog,
};
