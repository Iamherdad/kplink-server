const db = require("../db/dbUtils");

const addStore = async (ctx, next) => {
  const { name, description, app_resource, start_path, start_type, version } =
    ctx.reqyest.body;

  const SQL1 = `SELECT * FROM store WHERE name = ? ADN is_delete = 0 ADD version = ?`;

  const store = await db.query(SQL1, [name, version]);

  if (store.length > 0) {
    ctx.body = {
      code: 1,
      msg: "store already exists",
    };
    return;
  }

  const SQL2 = `INSERT INTO store SET ?`;

  const result = await db.query(SQL2, {
    name,
    description,
    app_resource,
    start_path,
    start_type,
    version,
  });

  ctx.body = {
    code: 0,
    data: result,
  };
};

const updateStore = async (ctx, next) => {
  const { name, description, app_resource, start_path, start_type, version } =
    ctx.reqyest.body;

  const SQL1 = `SELECT * FROM store WHERE name = ? ADN is_delete = 0 ADD version = ?`;

  const store = await db.query(SQL1, [name, version]);

  if (store.length > 0) {
    ctx.body = {
      code: 1,
      msg: "store already exists",
    };
    return;
  }

  const SQL2 = `UPDATE store SET ? WHERE id = ?`;

  const result = await db.query(SQL2, {
    name,
    description,
    app_resource,
    start_path,
    start_type,
    version,
  });

  ctx.body = {
    code: 0,
    data: result,
  };
};

module.exports = {
  addStore,
};
