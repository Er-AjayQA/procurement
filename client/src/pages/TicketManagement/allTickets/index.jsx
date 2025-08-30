import { AllTicketPage } from "../../../components/ticketManagement/allTickets/allTicketPage";
import { AllTicketProvider } from "../../../contextApis/ticketManagement/allTickets/allTicketProvider";

export const MainAllTicketPage = () => {
  return (
    <AllTicketProvider>
      <AllTicketPage />
    </AllTicketProvider>
  );
};
