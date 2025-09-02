import { ResolvedTicketPage } from "../../../components/ticketManagement/resolvedTickets/resolvedTicketPage";
import { ResolvedTicketProvider } from "../../../contextApis/ticketManagement/resolvedTickets/resolvedTicketProvider";

export const MainResolvedTicketPage = () => {
  return (
    <ResolvedTicketProvider>
      <ResolvedTicketPage />
    </ResolvedTicketProvider>
  );
};
