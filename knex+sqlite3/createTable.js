const { options } = require("./options/mariadb");
const knex = require("knex")(options);

knex.schema
  .createTable("cars", (table) => {
    table.increments("id"), table.string("name"), table.integer("price");
  })
  .then(() => {
    console.log("tabla creada!");
    knex.destroy();
  })
  .catch((e) => {
    console.log("Error en create de tabla:", e);
    knex.destroy();
  });
