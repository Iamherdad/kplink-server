const Router = require("@koa/router");
const { getBanner } = require("../controller/bannerController");
const router = new Router({
  prefix: "/banner",
});

router.get("/", getBanner);

// router.post("/", verifyAddTag, addTag);

// router.post("/delete", getAllTag);

module.exports = router.routes();
