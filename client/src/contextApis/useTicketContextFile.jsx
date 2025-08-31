import { useContext } from "react";
import { AllTicketContext } from "./ticketManagement/allTickets/allTicketContext";
import { DepartmentalTicketContext } from "./ticketManagement/departmentalTickets/departmentalTicketContext";

// Use All Ticket Context
export const useAllTicketsContext = () => {
  const context = useContext(AllTicketContext);
  if (context === undefined) {
    throw new Error(
      "useAllTicketsContext must be used within a AllTicketProvider"
    );
  }
  return context;
};

// Use Departmental Ticket Context
export const useDepartmentalTicketsContext = () => {
  const context = useContext(DepartmentalTicketContext);
  if (context === undefined) {
    throw new Error(
      "useDepartmentalTicketsContext must be used within a DepartmentalTicketProvider"
    );
  }
  return context;
};
