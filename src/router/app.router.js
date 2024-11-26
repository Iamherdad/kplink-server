const Router = require("@koa/router");

const {
  verifyAddApp,
  verifyModifyApp,
} = require("../middleware/app.middleware");
const {
  getApps,
  addApp,
  modifyApp,
  removeApp,
  getAppInfo,
} = require("../controller/app.controller");
const router = new Router({
  prefix: "/app",
});

router.get("/", getApps);

router.get("/info", getAppInfo);

router.post("/", verifyAddApp, addApp);

router.post("/modify", verifyModifyApp, modifyApp);

router.post("/delete", removeApp);

module.exports = router.routes();
