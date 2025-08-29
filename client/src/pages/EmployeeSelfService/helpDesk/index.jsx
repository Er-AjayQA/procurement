import { HelpDeskPage } from "../../../components/employeeSelfService/helpDesk/helpDeskPage";
import { HelpDeskProvider } from "../../../contextApis/employeeSelfService/helpDesk/helpDeskProvider";

export const MainHelpDeskPage = () => {
  return (
    <HelpDeskProvider>
      <HelpDeskPage />
    </HelpDeskProvider>
  );
};
