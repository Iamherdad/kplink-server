const joi = require("joi");

const addAppSchema = joi.object({
  name: joi.string().required().min(1).max(32),
  description: joi.string().required().min(1).max(100),
  icon: joi.string().required().min(1).max(255),
  resource_id: joi.number().required(),
  version: joi.string().required().min(5).max(5),
  update_description: joi.string().required().min(1).max(255),
  preview_images: joi
    .array()
    .required()
    .items(joi.string().required().min(1).max(255))
    .min(1)
    .max(5),
});

const modifyAppSchema = joi.object({
  id: joi.string().required().min(1).max(32),
  name: joi.string().required().min(1).max(32),
  description: joi.string().required().min(1).max(100),
  icon: joi.string().required().min(1).max(255),
  resource_id: joi.number().required(),
  version: joi.string().required().min(5).max(5),
  update_description: joi.string().required().min(1).max(255),
  preview_images: joi
    .array()
    .required()
    .items(joi.string().required().min(1).max(255))
    .min(1)
    .max(5),
});

const verifyAddApp = async (ctx, next) => {
  const {
    name,
    description,
    icon,
    resource_id,
    version,
    update_description,
    preview_images,
  } = ctx.request.body;

  const result = addAppSchema.validate({
    name,
    description,
    icon,
    resource_id,
    version,
    update_description,
    preview_images,
  });

  if (result.error) {
    console.log("result.error", result.error);
    ctx.app.emit("error", "PAYLOAD_ERROR", ctx);
    return;
  }
  await next();
};

const verifyModifyApp = async (ctx, next) => {
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

  const result = modifyAppSchema.validate({
    id,
    name,
    description,
    icon,
    resource_id,
    version,
    update_description,
    preview_images,
  });

  if (result.error) {
    console.log("result.error", result.error);
    ctx.app.emit("error", "PAYLOAD_ERROR", ctx);
    return;
  }
  await next();
};

module.exports = {
  verifyAddApp,
  verifyModifyApp,
};
