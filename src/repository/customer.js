const { getKnex, tables } = require("../data/index");

const getByEmail = async (email) => {
  const customer = await getKnex()(tables.customer)
    .where("email", email)
    .first();
  return customer;
};

const getBySupplierId = async (supplierId) => {
  const customer = await getKnex()(tables.customer)
    .where("SUPPLIER_supplier_id", supplierId)
    .first();
  return customer;
};

module.exports = {
  getByEmail,
  getBySupplierId,
};