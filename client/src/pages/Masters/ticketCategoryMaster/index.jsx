import { TicketCategoryMasterPage } from "../../../components/masters/ticketCategoryMasters/ticketCategoryMasterPage";
import { TicketCategoryMasterProvider } from "../../../contextApis/masters/ticketCategoryMaster/ticketCategoryMasterProvider";

export const MasterTicketCategoryPage = () => {
  return (
    <TicketCategoryMasterProvider>
      <TicketCategoryMasterPage />
    </TicketCategoryMasterProvider>
  );
};
