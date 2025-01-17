const { tables } = require("../index");

module.exports = {
  seed: async (knex) => {
    await knex(tables.user).insert([
      {
        user_id: 1,
        email: "Kate@delaware.be",
        street: "Grote Martk",
        box: "B2",
        city: "Aalst",
        country: "Belgium",
        house_number: 23,
        is_admin: 1,
        name: "Admin",
        password: "Katie123",
        postal_code: "9300",
        surname: "Kate",
        phone_number: "0470 25 25 25",
        SUPPLIER_supplier_id: 3,
      },
      {
        user_id: 2,
        email: "Kamal@delaware.be",
        street: "Sint-Baafsplein",
        box: "A1",
        city: "Gent",
        country: "Belgium",
        house_number: 16,
        is_admin: 0,
        name: "Kamal",
        password: "KamalTheBest",
        postal_code: "9000",
        surname: "Kamal",
        phone_number: "0470 25 12 34",
        SUPPLIER_supplier_id: 3,
      },
    ]);
  },
};
