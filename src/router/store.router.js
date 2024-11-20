const Router = require("@koa/router");

const { verifyAddStore } = require("../middleware/store.middleware");
const { addStore, getstores } = require("../controller/store.controells");
const router = new Router({
  prefix: "/store",
});

router.get("/", getstores);

router.post("/", verifyAddStore, addStore);

// router.post("/update", verifyAddStore, async (ctx) => {
//   ctx.body = "Update store";
// });

// router.post("/delete", async (ctx) => {});

module.exports = router.routes();
