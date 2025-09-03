import { CalendarPage } from "../../../components/employeeSelfService/calendar/calendarPage";
import { CalendarProvider } from "../../../contextApis/employeeSelfService/calendar/calendarProvider";

export const MainCalendarPage = () => {
  return (
    <CalendarProvider>
      <CalendarPage />
    </CalendarProvider>
  );
};
