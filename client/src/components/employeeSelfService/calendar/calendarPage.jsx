import { CalendarListing } from "./calendarListing";
import { CalendarEventForm } from "./calendarEventForm";
import { CalendarView } from "./calendarView";
import { useCalendarContext } from "../../../contextApis/useEssContextFile";

export const CalendarPage = () => {
  const { componentType, handleComponentView } = useCalendarContext();

  return (
    <>
      <div className="px-2 h-full">
        {componentType === "listing" && (
          <CalendarListing componentType={componentType} />
        )}

        {componentType === "form" && (
          <CalendarEventForm onClose={() => handleComponentView("listing")} />
        )}

        {componentType === "view" && <CalendarView />}
      </div>
    </>
  );
};
