import { useDepartmentalTicketsContext } from "../../../contextApis/useTicketContextFile";
import { DepartmentalTicketListing } from "./departmentalTicketListing";
import { DepartmentalTicketForm } from "./departmentalTicketForm";
import { DepartmentalTicketView } from "./departmentalTicketView";

export const DepartmentalTicketPage = () => {
  const { componentType, handleComponentView } =
    useDepartmentalTicketsContext();

  return (
    <>
      <div className="px-5 h-full">
        {componentType === "listing" && (
          <DepartmentalTicketListing componentType={componentType} />
        )}

        {componentType === "form" && (
          <DepartmentalTicketForm
            onClose={() => handleComponentView("listing")}
          />
        )}

        {componentType === "view" && <DepartmentalTicketView />}
      </div>
    </>
  );
};
