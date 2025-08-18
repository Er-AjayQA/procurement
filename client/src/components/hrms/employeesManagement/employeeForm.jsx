import { useState } from "react";
import { useEmployeeContext } from "../../../contextApis/useHrmsContextFile";
import { EmployeeBasicDetailsForm } from "./employeeFormComponents/basicDetailsForm";
import { EmployeeContractDetailsForm } from "./employeeFormComponents/contractDetailsForm";
import { EmployeePersonalDetailsForm } from "./employeeFormComponents/personalDetailsForm";
import { EmployeeSalaryDetailsForm } from "./employeeFormComponents/salaryDetailsForm";
import { EmployeePaymentDetailsForm } from "./employeeFormComponents/paymentDetailsForm";
import { EmployeeDocumentDetailsForm } from "./employeeFormComponents/documentDetailsForm";

export const EmployeeForm = () => {
  const { data, handleTabClick, tabType, handleComponentView } =
    useEmployeeContext();
  const [tabList, setTabList] = useState([
    { name: "Basic Details", value: "basic_details" },
    { name: "Personal Details", value: "personal_details" },
    { name: "Salary Details", value: "salary_details" },
    { name: "Payment Details", value: "payment_details" },
    { name: "Document Details", value: "document_details" },
    { name: "Contract Details", value: "contract_details" },
  ]);

  const tabDisplay = {
    basic_details: <EmployeeBasicDetailsForm />,
    personal_details: <EmployeePersonalDetailsForm />,
    salary_details: <EmployeeSalaryDetailsForm />,
    payment_details: <EmployeePaymentDetailsForm />,
    document_details: <EmployeeDocumentDetailsForm />,
    contract_details: <EmployeeContractDetailsForm />,
  };

  return (
    <>
      <div className="flex flex-col">
        {/* Employee Profile */}
        <div className="flex flex-col pt-2 border-b border-b-gray-200">
          {/* Employee Tabs */}
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

        {/* Employee Details Form */}
        <div className="py-5">{tabDisplay[tabType]}</div>
      </div>
    </>
  );
};
