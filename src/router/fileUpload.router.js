const Router = require("@koa/router");
const { koaBody } = require("koa-body");
const {
  errorHandler,
  verifyAppFile,
} = require("../middleware/fileUpload.middleware");
const { appUploadController } = require("../controller/fileUpload.controller");

const router = new Router({
  prefix: "/file",
});

router.post("/", (ctx, next) => {
  ctx.body = "File upload";
});

router.post(
  "/app",
  errorHandler,
  koaBody({
    multipart: true,
    formidable: {
      keepExtensions: true,
      maxFileSize: 3000 * 1024 * 1024,
    },
  }),
  verifyAppFile,
  appUploadController
);

module.exports = router.routes();
