import { useContext } from "react";
import { RegisteredEventsContext } from "./eventManagement/registeredEvents/registeredEventsContext";

// Use Registered Events Context
export const useRegisteredEventsContext = () => {
  const context = useContext(RegisteredEventsContext);
  if (context === undefined) {
    throw new Error(
      "useRegisteredEventsContext must be used within a RegisteredEventsProvider"
    );
  }
  return context;
};
