import { HelpDeskListing } from "./helpDeskListing";
import { HelpDeskForm } from "./helpDeskForm";
import { HelpDeskView } from "./helpDeskView";
import { useHelpDeskContext } from "../../../contextApis/useEssContextFile";

export const HelpDeskPage = () => {
  const { componentType, handleComponentView } = useHelpDeskContext();

  return (
    <>
      <div className="px-5 h-full">
        {componentType === "listing" && (
          <HelpDeskListing componentType={componentType} />
        )}

        {componentType === "form" && (
          <HelpDeskForm onClose={() => handleComponentView("listing")} />
        )}

        {componentType === "view" && <HelpDeskView />}
      </div>
    </>
  );
};
