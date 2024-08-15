const Router = require("@koa/router");
const { getCore } = require("../db/sql");
const router = new Router({
  prefix: "/core",
});

router.get("/", async (ctx) => {
  try {
    const apps = await getCore();
    ctx.body = apps;
  } catch (error) {
    console.log(error);
    ctx.body = 100;
  }
});

router.get("/list", async (ctx) => {
  ctx.body = "List of extensions";
});

module.exports = router.routes();
