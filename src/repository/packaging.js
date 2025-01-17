const { getKnex, tables } = require("../data/index");

const getAll = async () => {
  const packagings = await getKnex()(tables.packaging)
    .select(
      "SUPPLIER_supplier_id",
      getKnex().raw(
        "CONCAT(length, ' x ', width, ' x ', height) as measurements"
      ),
      "name as packaging_name",
      getKnex().raw("CONCAT('€ ', price) as price"),
      "packaging_id"
    )
    .andWhereNot("is_active", 0);
  return packagings;
};

module.exports = {
  getAll,
};
