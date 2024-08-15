const fs = require("fs");
const path = require("path");

const registerRoutes = (app) => {
  const routes = fs
    .readdirSync(path.resolve(__dirname))
    .filter((file) => file.endsWith(".router.js"));
  routes.forEach((file) => {
    const route = require(`./${file}`);
    app.use(route);
  });
};
module.exports = registerRoutes;
