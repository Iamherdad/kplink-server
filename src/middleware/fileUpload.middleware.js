const fs = require("fs");
const crypto = require("crypto");
const unzipper = require("unzipper");

const errorHandler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.log(err);
    ctx.app.emit("error", "FILE_UPLOAD_FILL", ctx);
  }
};

const calculateFileHash = (file) => {
  const hash = crypto.createHash("md5");
  if (typeof file === "string") {
    hash.update(fs.readFileSync(file));
  } else {
    hash.update(fs.readFileSync(file.path));
  }
  return hash.digest("hex");
};

const verifyAppFile = async (ctx, next) => {
  const { files } = ctx.request;

  if (Array.isArray(files.file) && files.file.length > 1) {
    ctx.app.emit("error", "FILE_NUM_SIZE", ctx);
    return;
  }

  const file = Array.isArray(files.file) ? files.file[0] : files.file;
  const { mimetype } = file;
  if (mimetype !== "application/zip") {
    ctx.app.emit("error", "FILE_TYPE_ERROR", ctx);
    return;
  }
  //拿到文件hash
  const hash = calculateFileHash(file.filepath);
  console.log("hash", hash);

  const directoryList = [];
  await fs
    .createReadStream(file.filepath)
    .pipe(unzipper.Parse())
    .on("entry", (entry) => {
      const filePath = entry.path;
      console.log("entry", entry);

      directoryList.push(filePath);
      entry.autodrain();
    })
    .promise();

  // 返回目录列表
  ctx.body = {
    hash,
    directories: directoryList,
  };

  await next();
};

module.exports = {
  errorHandler,
  verifyAppFile,
};
