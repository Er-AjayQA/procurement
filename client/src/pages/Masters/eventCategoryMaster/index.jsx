import { EventCategoryMasterPage } from "../../../components/masters/eventCategoryMasters/eventCategoryMasterPage";
import { EventCategoryMasterProvider } from "../../../contextApis/masters/eventCategoryMaster/eventCategoryMasterProvider";

export const MasterEventCategoryPage = () => {
  return (
    <EventCategoryMasterProvider>
      <EventCategoryMasterPage />
    </EventCategoryMasterProvider>
  );
};
