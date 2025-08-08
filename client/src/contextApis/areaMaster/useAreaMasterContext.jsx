import { useContext } from "react";
import { AreaMasterContext } from "./areaMasterContext";

export const useAreaMaster = () => {
  const context = useContext(AreaMasterContext);
  if (context === undefined) {
    throw new Error("useAreaMaster must be used within a AreaMasterProvider");
  }
  return context;
};
