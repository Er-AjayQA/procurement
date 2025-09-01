import { useDepartmentalTicketsContext } from "../../../contextApis/useTicketContextFile";
import { DepartmentalTicketListing } from "./departmentalTicketListing";
import { DepartmentalTicketView } from "./departmentalTicketView";

export const DepartmentalTicketPage = () => {
  const { componentType } = useDepartmentalTicketsContext();

  return (
    <>
      <div className="px-5 h-full">
        {componentType === "listing" && (
          <DepartmentalTicketListing componentType={componentType} />
        )}

        {componentType === "view" && <DepartmentalTicketView />}
      </div>
    </>
  );
};
