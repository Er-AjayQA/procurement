import { useMyTicketsInboxContext } from "../../../contextApis/useTicketContextFile";
import { MyTicketInboxListing } from "./myTicketInboxListing";
import { MyTicketInboxForm } from "./myTicketInboxForm";
import { MyTicketInboxView } from "./myTicketInboxView";

export const MyTicketInboxPage = () => {
  const { componentType, handleComponentView } = useMyTicketsInboxContext();

  return (
    <>
      <div className="px-5 h-full">
        {componentType === "listing" && (
          <MyTicketInboxListing componentType={componentType} />
        )}

        {componentType === "form" && (
          <MyTicketInboxForm onClose={() => handleComponentView("listing")} />
        )}

        {componentType === "view" && <MyTicketInboxView />}
      </div>
    </>
  );
};
