import { useContext } from "react";
import { AllTicketContext } from "./ticketManagement/allTickets/allTicketContext";
import { DepartmentalTicketContext } from "./ticketManagement/departmentalTickets/departmentalTicketContext";
import { MyTicketInboxContext } from "./ticketManagement/myTicketsInbox/myTicketInboxContext";

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

// Use My Ticket Inbox Context
export const useMyTicketsInboxContext = () => {
  const context = useContext(MyTicketInboxContext);
  if (context === undefined) {
    throw new Error(
      "useMyTicketsInboxContext must be used within a MyTicketInboxProvider"
    );
  }
  return context;
};
