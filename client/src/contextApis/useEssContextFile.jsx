import { useContext } from "react";
import { HelpDeskContext } from "./employeeSelfService/helpDesk/helpDeskContext";

// Use Help Desk Context
export const useHelpDeskContext = () => {
  const context = useContext(HelpDeskContext);
  if (context === undefined) {
    throw new Error(
      "useHelpDeskContext must be used within a HelpDeskProvider"
    );
  }
  return context;
};
