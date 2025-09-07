import { useEntityConfigContext } from "../../../contextApis/useEntityContextFile";
import { EntityBasicDetails } from "./entityConfigViewComponents/basicDetails";
import { EntityCommunicationDetails } from "./entityConfigViewComponents/communicationDetails";
import { EntityRegionalDetails } from "./entityConfigViewComponents/regionalDetails";
import { EntitySmtpDetails } from "./entityConfigViewComponents/smtpDetails";

export const EntityConfigView = () => {
  const { data, handleTabClick, tabType, handleComponentView } =
    useEntityConfigContext();

  const tabDisplay = {
    basic_details: <EntityBasicDetails />,
    smtp_details: <EntitySmtpDetails />,
    communication_details: <EntityCommunicationDetails />,
    regional_details: <EntityRegionalDetails />,
  };

  return (
    <>
      <div className="flex flex-col">
        {/* Employee Profile */}
        <div className="flex flex-col pt-2 border-b border-b-gray-200">
          <div className="flex justify-between gap-3 items-center mb-2">
            <div className="flex items-center gap-3">
              <div className="flex justify-between w-[5rem] h-[5rem] rounded-[50%] overflow-hidden">
                <img
                  src="/Images/dummy_userProfile.png"
                  alt="user-profile-image"
                />
              </div>
              <div>
                <p className="font-bold">
                  {data?.name} (<span>{data?.designation_name}</span>)
                </p>
                <p className="text-[.6rem]">{data?.emp_code}</p>
              </div>
            </div>
            <div>
              <button
                className="bg-red-600 py-1 px-5 rounded-lg text-white hover:bg-red-700 text-sm font-bold"
                onClick={() => {
                  handleComponentView("listing");
                  handleTabClick("basic_details");
                }}
              >
                Back
              </button>
            </div>
          </div>
          {/* Employee Tabs */}
          <div>
            <ul className="flex gap-5">
              <li
                className={`text-[.8rem] cursor-pointer font-bold p-2 rounded-t-md border border-transparent hover:text-white hover:border-gray-300 hover:bg-body-bg_color ${
                  tabType === "basic_details"
                    ? "border-gray-300 bg-body-bg_color text-white"
                    : ""
                }`}
                onClick={() => handleTabClick("basic_details")}
              >
                Basic Details
              </li>
              <li
                className={`text-[.8rem] cursor-pointer font-bold p-2 rounded-t-md transition-all duration-[.4s] linear border border-transparent hover:text-white hover:border-gray-300 hover:bg-body-bg_color ${
                  tabType === "personal_details"
                    ? "border-gray-300 bg-body-bg_color text-white"
                    : ""
                }`}
                onClick={() => handleTabClick("personal_details")}
              >
                SMTP Details
              </li>
              <li
                className={`text-[.8rem] cursor-pointer font-bold p-2 rounded-t-md transition-all duration-[.4s] linear border border-transparent hover:text-white hover:border-gray-300 hover:bg-body-bg_color ${
                  tabType === "salary_details"
                    ? "border-gray-300 bg-body-bg_color text-white"
                    : ""
                }`}
                onClick={() => handleTabClick("salary_details")}
              >
                Communication Details
              </li>
              <li
                className={`text-[.8rem] cursor-pointer font-bold p-2 rounded-t-md transition-all duration-[.4s] linear border border-transparent hover:text-white hover:border-gray-300 hover:bg-body-bg_color ${
                  tabType === "payment_details"
                    ? "border-gray-300 bg-body-bg_color text-white"
                    : ""
                }`}
                onClick={() => handleTabClick("payment_details")}
              >
                Regional Details
              </li>
            </ul>
          </div>
        </div>

        {/* Emplyee Details Form */}
        <div className="py-5">{tabDisplay[tabType]}</div>
      </div>
    </>
  );
};
