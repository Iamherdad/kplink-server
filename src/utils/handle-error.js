const app = require("../app/app");

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
    case "PAYLOAD_ERROR":
      message = "请求参数错误";
      break;
    case "DATA_EXIST":
      message = "数据已存在";
      break;
    case "TAG_EXIST":
      message = "标签已存在";
      break;
  }
  ctx.body = { code, message, data };
});
