const Router = require("@koa/router");
const { verifyAddStartLog } = require("../middleware/log.middleware");
const { addStartLog } = require("../controller/log.controller");
const router = new Router({
  prefix: "/log",
});

router.post("/start", verifyAddStartLog, addStartLog);

module.exports = router.routes();
