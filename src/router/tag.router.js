const Router = require("@koa/router");
const { verifyAddTag } = require("../middleware/tag.middleware");
const { addTag, getAllTag } = require("../controller/tag.controller");
const router = new Router({
  prefix: "/tag",
});

router.get("/", getAllTag);

router.post("/", verifyAddTag, addTag);

router.post("/delete", getAllTag);

module.exports = router.routes();
