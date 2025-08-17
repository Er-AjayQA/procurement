import { useEmployeeContext } from "../../../contextApis/useHrmsContextFile";
import { EmployeeBasicDetails } from "./employeeViewComponents/basicDetails";
import { EmployeeContractDetails } from "./employeeViewComponents/contractDetails";
import { EmployeeDocumentDetails } from "./employeeViewComponents/documentDetails";
import { EmployeePaymentDetails } from "./employeeViewComponents/paymentDetails";
import { EmployeePersonalDetails } from "./employeeViewComponents/personalDetails";
import { EmployeeSalaryDetails } from "./employeeViewComponents/salaryDetails";

export const EmployeeView = () => {
  const { data, handleTabClick, tabType,handleComponentView } = useEmployeeContext();

  const tabDisplay = {
    basicDetails: <EmployeeBasicDetails />,
    personalDetails: <EmployeePersonalDetails />,
    salaryDetails: <EmployeeSalaryDetails />,
    paymentDetails: <EmployeePaymentDetails />,
    documentDetails: <EmployeeDocumentDetails />,
    contractDetails: <EmployeeContractDetails />,
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
              <button className="bg-red-600 py-1 px-5 rounded-lg text-white hover:bg-red-700 text-sm font-bold" onClick={()=>handleComponentView("listing")}>
                Back
              </button>
            </div>
          </div>
          {/* Employee Tabs */}
          <div>
            <ul className="flex gap-5">
              <li
                className={`text-[.8rem] cursor-pointer font-bold p-2 rounded-t-md border border-transparent hover:text-white hover:border-gray-300 hover:bg-body-bg_color ${
                  tabType === "basicDetails"
                    ? "border-gray-300 bg-body-bg_color text-white"
                    : ""
                }`}
                onClick={() => handleTabClick("basicDetails")}
              >
                Basic Details
              </li>
              <li
                className={`text-[.8rem] cursor-pointer font-bold p-2 rounded-t-md transition-all duration-[.4s] linear border border-transparent hover:text-white hover:border-gray-300 hover:bg-body-bg_color ${
                  tabType === "personalDetails"
                    ? "border-gray-300 bg-body-bg_color text-white"
                    : ""
                }`}
                onClick={() => handleTabClick("personalDetails")}
              >
                Personal Details
              </li>
              <li
                className={`text-[.8rem] cursor-pointer font-bold p-2 rounded-t-md transition-all duration-[.4s] linear border border-transparent hover:text-white hover:border-gray-300 hover:bg-body-bg_color ${
                  tabType === "salaryDetails"
                    ? "border-gray-300 bg-body-bg_color text-white"
                    : ""
                }`}
                onClick={() => handleTabClick("salaryDetails")}
              >
                Salary Details
              </li>
              <li
                className={`text-[.8rem] cursor-pointer font-bold p-2 rounded-t-md transition-all duration-[.4s] linear border border-transparent hover:text-white hover:border-gray-300 hover:bg-body-bg_color ${
                  tabType === "paymentDetails"
                    ? "border-gray-300 bg-body-bg_color text-white"
                    : ""
                }`}
                onClick={() => handleTabClick("paymentDetails")}
              >
                Payment Details
              </li>
              <li
                className={`text-[.8rem] cursor-pointer font-bold p-2 rounded-t-md transition-all duration-[.4s] linear border border-transparent hover:text-white hover:border-gray-300 hover:bg-body-bg_color ${
                  tabType === "documentDetails"
                    ? "border-gray-300 bg-body-bg_color text-white"
                    : ""
                }`}
                onClick={() => handleTabClick("documentDetails")}
              >
                Document Details
              </li>
              <li
                className={`text-[.8rem] cursor-pointer font-bold p-2 rounded-t-md transition-all duration-[.4s] linear border border-transparent hover:text-white hover:border-gray-300 hover:bg-body-bg_color ${
                  tabType === "contractDetails"
                    ? "border-gray-300 bg-body-bg_color text-white"
                    : ""
                }`}
                onClick={() => handleTabClick("contractDetails")}
              >
                Contract Details
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
