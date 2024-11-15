const Router = require("@koa/router");
const { getCore } = require("../db/sql");
const router = new Router({
  prefix: "/file",
});

router.post("/", (ctx, next) => {
  ctx.body = "File upload";
});

router.post("/app", (ctx, next) => {
  ctx.body = "File upload";
});

module.exports = router.routes();
