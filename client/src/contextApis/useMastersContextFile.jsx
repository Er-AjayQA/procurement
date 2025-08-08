import { useContext } from "react";
import { AreaMasterContext } from "./areaMaster/areaMasterContext";

export const useMasterContext = () => {
  const context = useContext(AreaMasterContext);
  if (context === undefined) {
    throw new Error("useAreaMaster must be used within a AreaMasterProvider");
  }
  return context;
};
