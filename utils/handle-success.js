const app = require("../src/app/app");

app.on("success", (data, ctx) => {
  let code = 1000;
  let message = "success";
  ctx.body = { code, message, data };
});
