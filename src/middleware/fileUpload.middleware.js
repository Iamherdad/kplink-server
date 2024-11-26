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

  await next();
};

const verifyImgType = async (ctx, next) => {
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

  if (fileType !== "png") {
    ctx.app.emit("error", "FILE_TYPE_ERROR", ctx);
    return;
  }

  ctx.state.file = file;

  await next();
};

module.exports = {
  errorHandler,
  verifyAppFile,
  verifyImgType,
};
