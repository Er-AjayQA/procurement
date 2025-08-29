import { useContext } from "react";
import { TicketContext } from "./ticketManagement/ticketContext";

// Use Ticket Context
export const useTicketContext = () => {
  const context = useContext(TicketContext);
  if (context === undefined) {
    throw new Error("useTicketContext must be used within a TicketProvider");
  }
  return context;
};
