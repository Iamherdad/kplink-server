const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const cors = require("koa2-cors");
const serve = require("koa-static");
const registerRoutes = require("../router/router.js");

const app = new Koa();

app.use(cors());
app.use(bodyParser());
app.use(serve(__dirname + "/public"));
registerRoutes(app);

module.exports = app;
