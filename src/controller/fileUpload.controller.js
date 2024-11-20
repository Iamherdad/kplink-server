const unzipper = require("unzipper");
const { buildDirectoryTree, calculateFileHash } = require("../utils/utils.js");
const { redis } = require("../db/index.js");
const { uploadFile } = require("../utils/oss.js");

const appUploadController = async (ctx, next) => {
  const { file } = ctx.state;
  const hash = calculateFileHash(file.filepath);

  const getCacheRes = await redis.get(hash);

  const directory = await unzipper.Open.file(file.filepath);
  const fileOriginName = file.originalFilename.split(".")[0];
  const fileType = file.originalFilename.split(".")[1];

  const file_tree = buildDirectoryTree(directory.files, hash, fileOriginName);
  ctx.body = {
    hash,
    file_tree,
  };

  if (getCacheRes) {
    console.log("file download url[cache]", getCacheRes);
    ctx.app.emit("success", file_tree, ctx);
    return;
  } else {
    try {
      const res = await uploadFile(`${hash}.${fileType}`, file.filepath);
      await redis.set(hash, res.url);
      console.log("file download url", res.url);
      ctx.app.emit("success", file_tree, ctx);
    } catch (err) {
      console.log("err", err);
      ctx.app.emit("error", "FILE_UPLOAD_FILL", ctx);
    }
  }
};

module.exports = {
  appUploadController,
};