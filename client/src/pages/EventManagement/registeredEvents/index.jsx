import { RegisteredEventsPage } from "../../../components/eventManagement/registeredEvents/registeredEventsPage";
import { RegisteredEventsProvider } from "../../../contextApis/eventManagement/registeredEvents/registeredEventsProvider";

export const MainRegisteredEventsPage = () => {
  return (
    <RegisteredEventsProvider>
      <RegisteredEventsPage />
    </RegisteredEventsProvider>
  );
};
