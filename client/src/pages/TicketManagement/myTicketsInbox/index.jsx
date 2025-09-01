import { MyTicketInboxPage } from "../../../components/ticketManagement/myTicketsInbox/myTicketInboxPage";
import { MyTicketInboxProvider } from "../../../contextApis/ticketManagement/myTicketsInbox/myTicketInboxProvider";

export const MainMyTicketInboxPage = () => {
  return (
    <MyTicketInboxProvider>
      <MyTicketInboxPage />
    </MyTicketInboxProvider>
  );
};
