const Router = require("@koa/router");
const { koaBody } = require("koa-body");
const {
  errorHandler,
  verifyAppFile,
  verifyImgType,
} = require("../middleware/fileUpload.middleware");
const {
  appUploadController,
  imgUploadController,
} = require("../controller/fileUpload.controller");

const router = new Router({
  prefix: "/file",
});

router.post(
  "/img",
  errorHandler,
  koaBody({
    multipart: true,
    formidable: {
      keepExtensions: true,
      maxFileSize: 30 * 1024 * 1024,
    },
  }),
  verifyImgType,
  imgUploadController
);

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
