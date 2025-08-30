import { useContext } from "react";
import { AllTicketContext } from "./ticketManagement/allTickets/allTicketContext";

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
