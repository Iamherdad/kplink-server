const joi = require("joi");

const addStoreSchema = joi.object({
  name: joi.string().required().min(1).max(255),
  description: joi.string().required().min(1).max(255),
  app_resource: joi.string().required().min(1).max(255),
  start_path: joi.string().required().min(1).max(255),
  start_type: joi.string().required().min(1).max(255),
  version: joi.number().required().min(0).max(9999999999),
});

const verifyAddStore = (ctx, next) => {
  const { name, description, app_resource, start_path, start_type, version } =
    ctx.reqyest.body;
  const result = addStoreSchema.validate({
    name,
    description,
    app_resource,
    start_path,
    start_type,
    version,
  });
  if (result.error) {
    ctx.body = result.error;
    return;
  }
  next();
};

module.exports = {
  verifyAddStore,
};
