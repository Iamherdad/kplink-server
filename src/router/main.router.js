const Router = require("@koa/router");

const router = new Router({
  prefix: "/",
});

router.get("/", async (ctx) => {
  ctx.body = "Hello World!";
});

module.exports = router.routes();
