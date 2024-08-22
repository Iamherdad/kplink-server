const Router = require("@koa/router");
const { getApps, createApp, updateApp, removeApp } = require("../db/sql");
const router = new Router({
  prefix: "/app",
});

router.get("/", async (ctx) => {
  try {
    console.log(111);
    const apps = await getApps();
    console.log(apps);
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
