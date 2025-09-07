import { useState } from "react";
import { EntityBasicDetailsForm } from "./entityConfigFormComponents/basicDetailsForm";
import { EntitySmtpDetailsForm } from "./entityConfigFormComponents/smtpDetailsForm";
import { EntityCommunicationDetailsForm } from "./entityConfigFormComponents/communicationDetailsForm";
import { EntityRegionalDetailsForm } from "./entityConfigFormComponents/regionalDetailsForm";
import { useEntityConfigContext } from "../../../contextApis/useEntityContextFile";

export const EntityConfigForm = () => {
  const { data, handleTabClick, tabType, handleComponentView } =
    useEntityConfigContext();
  const [tabList, setTabList] = useState([
    { name: "Basic Details", value: "basic_details" },
    { name: "SMTP Details", value: "smtp_details" },
    { name: "Communication Details", value: "communication_details" },
    { name: "Regional Details", value: "regional_details" },
  ]);

  const tabDisplay = {
    basic_details: <EntityBasicDetailsForm />,
    smtp_details: <EntitySmtpDetailsForm />,
    communication_details: <EntityCommunicationDetailsForm />,
    regional_details: <EntityRegionalDetailsForm />,
  };

  return (
    <>
      <div className="flex flex-col">
        {/* Entity Profile */}
        <div className="flex flex-col pt-2 border-b border-b-gray-200">
          {/* Entity Tabs */}
          <div>
            <ul className="flex gap-5">
              {tabList.map((tab) => (
                <li
                  key={tab.value}
                  className={`text-[.8rem] cursor-pointer font-bold p-2 rounded-t-md border border-transparent hover:text-white hover:border-gray-300 hover:bg-body-bg_color ${
                    tabType === tab.value
                      ? "border-gray-300 bg-body-bg_color text-white"
                      : ""
                  }`}
                  onClick={() => handleTabClick(tab.value)}
                >
                  {tab.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Entity Details Form */}
        <div className="py-5">{tabDisplay[tabType]}</div>
      </div>
    </>
  );
};
