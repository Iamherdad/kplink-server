const app = require("../src/app/app");

app.on("error", (err, ctx) => {
  let code = -1000;
  let message = "";
  let data = {};
  switch (err) {
    //系统错误
    case "SYSTEM_ERROR":
      message = "系统错误";
      break;
    case "FILE_UPLOAD_FILL":
      message = "文件上传失败";
      break;
    case "FILE_MAX_SIZE":
      message = "文件大小超过限制";
      break;
    case "FILE_NUM_SIZE":
      message = "文件数量超过限制";
      break;
    case "FILE_TYPE_ERROR":
      message = "文件类型错误";
      break;
  }
  ctx.body = { code, message, data };
});
