const notificationRepository = require("../repository/notification");
const ServiceError = require("../core/serviceError");
const { getLogger } = require("../core/logging");

const getAllByAuthId = async (auth0Id) => {
  
  const notifications = await notificationRepository.getAllByAuthId(auth0Id);
  
  if (!notifications) {
    throw ServiceError.notFound("there are no notifications for this auth0Id");
  }

  return {
    items:notifications,
    count:notifications.length || 1,
  };
};

const getNotReadByAuthId = async (auth0Id) => {
  const notifications = await notificationRepository.getNotReadByAuthId(auth0Id);

  if (!notifications) {
    throw ServiceError.notFound("there are no notifications for this auth0Id");
  }

  return {
    items:notifications,
    count:notifications.length || 1,
  };
};

const updateById = async (notification) => {

  let existingNotification

  if (notification.notification_id) {
    existingNotification = await notificationRepository.getById(notification.notification_id);
    if (!existingNotification) {
      getLogger().error(`there is no notification with id: ${notification.notification_id}`);
      throw new ServiceError.notFound(`there is no notification with id: ${notification.notification_id}`);
    }
  }
  const toReturn = await notificationRepository.updateById(notification.notification_id,notification);

  return toReturn;

};

module.exports = {
  getAllByAuthId,getNotReadByAuthId,updateById,
}