import { useContext } from "react";
import { HelpDeskContext } from "./employeeSelfService/helpDesk/helpDeskContext";
import { CalendarContext } from "./employeeSelfService/calendar/calendarContext";

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

// Use Calendar Context
export const useCalendarContext = () => {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error(
      "useCalendarContext must be used within a CalendarProvider"
    );
  }
  return context;
};
