const fs = require("fs");
const crypto = require("crypto");
const unzipper = require("unzipper");
const { title } = require("process");
const path = require("path");

const errorHandler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.log(err);
    ctx.app.emit("error", "FILE_UPLOAD_FILL", ctx);
  }
};

const verifyAppFile = async (ctx, next) => {
  const { files } = ctx.request;

  if (Array.isArray(files.file) && files.file.length > 1) {
    ctx.app.emit("error", "FILE_NUM_SIZE", ctx);
    return;
  }

  const file = Array.isArray(files.file) ? files.file[0] : files.file;

  const fileType =
    file.originalFilename.split(".")[
      file.originalFilename.split(".").length - 1
    ];
  console.log("fileType", fileType);
  if (fileType !== "zip") {
    ctx.app.emit("error", "FILE_TYPE_ERROR", ctx);
    return;
  }

  ctx.state.file = file;
  //拿到文件hash
  // const hash = calculateFileHash(file.filepath);
  // console.log("hash", hash);

  // const directory = await unzipper.Open.file(file.filepath);
  // const file_tree = buildDirectoryTree(directory.files);

  // ctx.state.file_tree = file_tree;
  // ctx.state.hash = hash;
  await next();
};

module.exports = {
  errorHandler,
  verifyAppFile,
};
