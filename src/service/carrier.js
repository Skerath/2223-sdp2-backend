const carrierRepository = require("../repository/carrier");
const ServiceError = require("../core/serviceError");
const customerService = require("./customer");

const getBySupplierId = async (auth0Id) => {
  const { supplier_id: supplierId } = await customerService.getSupplierId(
    auth0Id
  );
  const carriers = await carrierRepository.getBySupplierId(supplierId);
  if (!carriers[0]) {
    throw ServiceError.notFound(`There are no carriers for this users company`);
  }
  return {
    items: carriers,
    count: carriers.length,
  };
};

module.exports = {
  getBySupplierId,
};
