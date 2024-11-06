const Router = require("@koa/router");
const { getstores } = require("../service/store.service");
const { verifyAddStore } = require("../middleware/store.middleware");
const { addStore } = require("../controller/store.controells");
const router = new Router({
  prefix: "/store",
});

router.get("/", async (ctx) => {
  try {
    const res = await getstores();
    ctx.body = res;
  } catch (error) {
    console.log(error);
    ctx.body = 100;
  }
});

router.post("/add", verifyAddStore, addStore);

router.post("/update", verifyAddStore, async (ctx) => {
  ctx.body = "Update store";
});

router.post("/delete", async (ctx) => {});

module.exports = router.routes();
