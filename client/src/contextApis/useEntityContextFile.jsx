import { useContext } from "react";
import { EntityConfigContext } from "./entityManagement/entityConfiguration/entityConfigContext";

// Use Entity Config Context
export const useEntityConfigContext = () => {
  const context = useContext(EntityConfigContext);
  if (context === undefined) {
    throw new Error(
      "useEntityConfigContext must be used within a EntityConfigProvider"
    );
  }
  return context;
};
