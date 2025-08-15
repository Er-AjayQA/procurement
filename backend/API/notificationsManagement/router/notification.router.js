// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const NotificationController = require("../controller/notification.controller");

// ========== ROUTES ========== //
router.post(
  "/generate-notification",
  NotificationController.createNotification
);
router.post(
  "/get-notification-details/:id",
  NotificationController.getNotificationDetails
);
router.post(
  "/get-all-notification-details",
  NotificationController.getAllNotificationDetails
);
router.put(
  "/archieve-notification/:id",
  NotificationController.archiveNotification
);
router.put(
  "/delete-notification/:id",
  NotificationController.deleteNotification
);

// ========== EXPORT ========== //
module.exports = router;
