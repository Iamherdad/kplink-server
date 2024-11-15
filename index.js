const app = require("./src/app/app");
const db = require("./src/db/index");
require("./utils/handle-error");
require("./utils/handle-success");
app.listen(8854, () => {
  console.log("Server is running on port 8854");
});
