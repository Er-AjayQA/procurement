import { DepartmentalTicketPage } from "../../../components/ticketManagement/departmentalTickets/departmentalTicketPage";
import { DepartmentalTicketProvider } from "../../../contextApis/ticketManagement/departmentalTickets/departmentalTicketProvider";

export const MainDepartmentalTicketPage = () => {
  return (
    <DepartmentalTicketProvider>
      <DepartmentalTicketPage />
    </DepartmentalTicketProvider>
  );
};
