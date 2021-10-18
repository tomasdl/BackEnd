const { prodsOptions } = require("./options/mariadb");
const prodsKnex = require("knex")(prodsOptions);

prodsKnex.schema
  .createTable("productos", (table) => {
    table.increments("id"), table.string("title"), table.integer("price");
  })
  .then(() => {
    console.log("tabla creada!");
    prodsKnex.destroy();
  })
  .catch((e) => {
    console.log("Error en create de tabla:", e);
    prodsKnex.destroy();
  });
