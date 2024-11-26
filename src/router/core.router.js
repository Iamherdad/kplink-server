const Router = require("@koa/router");
const {
  getCore,
  modifyCore,
  getSoftWare,
} = require("../controller/core.controller");

const { verifyModifyCore } = require("../middleware/core.middleware");
const router = new Router({
  prefix: "/core",
});

router.get("/", getCore);

router.get("/software", getSoftWare);

router.post("/modify", verifyModifyCore, modifyCore);
module.exports = router.routes();
