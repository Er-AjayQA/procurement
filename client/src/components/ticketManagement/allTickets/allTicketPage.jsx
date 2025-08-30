import { useAllTicketsContext } from "../../../contextApis/useTicketContextFile";
import { AllTicketView } from "./allTicketView";
import { AllTicketListing } from "./allTicketListing";
import { AllTicketForm } from "./allTicketForm";

export const AllTicketPage = () => {
  const { componentType, handleComponentView } = useAllTicketsContext();

  return (
    <>
      <div className="px-5 h-full">
        {componentType === "listing" && (
          <AllTicketListing componentType={componentType} />
        )}

        {componentType === "form" && (
          <AllTicketForm onClose={() => handleComponentView("listing")} />
        )}

        {componentType === "view" && <AllTicketView />}
      </div>
    </>
  );
};
