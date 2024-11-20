const app = require("./src/app/app");
const db = require("./src/db/index");

require("./src/utils/handle-error");
require("./src/utils/handle-success");
app.listen(8854, () => {
  console.log("Server is running on port 8854");
});
