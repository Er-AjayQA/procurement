import { useContext } from "react";
import { NotificationContext } from "./notificationManagement/notificationContext";

// Use Role Master Context
export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotificationContext must be used within a NotificationProvider"
    );
  }
  return context;
};
