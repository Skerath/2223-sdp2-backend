const orderRepository = require("../repository/order");
const ServiceError = require("../core/serviceError");
const { getByAuthId } = require("./profile");

const getByTrackingCodes = async ({ trackAndTraceCode, verificationCode }) => {
  const verificationType =
    await orderRepository.getVerificationTypeByTrackAndTraceCode(
      trackAndTraceCode
    );

  if (!verificationType) {
    throw ServiceError.notFound(
      `There is no order with track and trace code "${trackAndTraceCode}" and verification code "${verificationCode}"`
    );
  }

  switch (verificationType.verification_type) {
    case "POST_CODE":
      order = await orderRepository.getTrackAndTraceByPostalCode(
        trackAndTraceCode,
        verificationCode
      );
      break;
    case "ORDER_ID":
      order = await orderRepository.getTrackAndTraceByOrderId(
        trackAndTraceCode,
        verificationCode
      );
  }

  if (!order) {
    throw ServiceError.notFound(
      `There is no order with track and trace code "${trackAndTraceCode}" and verification code "${verificationCode}"`
    );
  }
  return {
    items: order,
    count: order.length || 1,
  };
};

const getById = async (id) => {
  const order = await orderRepository.getById(id);

  if (!order) {
    throw ServiceError.notFound(`There is no order with id "${id}"`);
  }

  return {
    items: order,
    count: order.length || 1,
  };
};

const postOrder = async (
  {
    delivery_country,
    delivery_city,
    delivery_postal_code,
    delivery_street,
    delivery_house_number,
    delivery_box,
    CARRIER_carrier_id,
    PACKAGING_packaging_id,
    SUPPLIER_supplier_id,
  },
  auth0Id
) => {
  const id = await orderRepository.postOrder(
    delivery_country,
    delivery_city,
    delivery_postal_code,
    delivery_street,
    delivery_house_number,
    delivery_box,
    (order_date = new Date()),
    (order_status = 0),
    (tracking_code = null),
    CARRIER_carrier_id,
    (CUSTOMER_supplier_id = (await getByAuthId(auth0Id)).items.supplier_id),
    PACKAGING_packaging_id,
    SUPPLIER_supplier_id
  );

  return {
    items: order,
    count: order.length || 1,
  };
};

module.exports = {
  getByTrackingCodes,
  getById,
  postOrder,
};
