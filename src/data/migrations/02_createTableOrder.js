const { tables } = require("../index");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.customer_order, (table) => {
      table.increments("order_id");
      table.string("delivery_country", 255).notNullable();
      table.string("delivery_city", 255).notNullable();
      table.integer("delivery_postal_code").notNullable();
      table.string("delivery_street", 255).notNullable();
      table.integer("delivery_house_number").notNullable();
      table.string("delivery_box", 255);
      table.date("order_date").notNullable();
      //table.decimal("original_acquisition_price").notNullable();
      table.integer("order_status").notNullable();
      table.string("tracking_code", 255);
      table
        .integer("CARRIER_carrier_id")
        .unsigned()
        .references(`${tables.carrier}.carrier_id`);
      table.integer("CUSTOMER_supplier_id").notNullable();
      table.integer("PACKAGING_packaging_id").notNullable();
      table.integer("SUPPLIER_supplier_id").notNullable();
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.customer_order);
  },
};