import { useResolvedTicketsContext } from "../../../contextApis/useTicketContextFile";
import { ResolvedTicketListing } from "./resolvedTicketListing";
import { ResolvedTicketView } from "./resolvedTicketView";

export const ResolvedTicketPage = () => {
  const { componentType } = useResolvedTicketsContext();

  return (
    <>
      <div className="px-5 h-full">
        {componentType === "listing" && (
          <ResolvedTicketListing componentType={componentType} />
        )}

        {componentType === "view" && <ResolvedTicketView />}
      </div>
    </>
  );
};
