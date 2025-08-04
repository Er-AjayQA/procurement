import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EmployeeBasicDetails } from "../../components/employeeSelfService/employeeDetails/basicDetails";
import { EmployeePersonalDetails } from "../../components/employeeSelfService/employeeDetails/personalDetails";
import { EmployeeSalaryDetails } from "../../components/employeeSelfService/employeeDetails/salaryDetails";
import { EmployeePaymentDetails } from "../../components/employeeSelfService/employeeDetails/paymentDetails";
import { EmployeeDocumentDetails } from "../../components/employeeSelfService/employeeDetails/documentDetails";
import { EmployeeContractDetails } from "../../components/employeeSelfService/employeeDetails/contractDetails";
import { getEmployeeData } from "../../Thunks/employeeDetailsThunk";

export const EmployeeDetailPage = () => {
  const { userDetails } = useSelector((state) => state.auth);
  const { employeeDetails } = useSelector((state) => state.employee);
  const [tabType, setTabType] = useState("basicDetails");
  const dispatch = useDispatch();

  // Handle Tabs Click
  const handleTabClick = (tabType) => {
    setTabType(tabType);
  };

  const tabDisplay = {
    basicDetails: <EmployeeBasicDetails />,
    personalDetails: <EmployeePersonalDetails />,
    salaryDetails: <EmployeeSalaryDetails />,
    paymentDetails: <EmployeePaymentDetails />,
    documentDetails: <EmployeeDocumentDetails />,
    contractDetails: <EmployeeContractDetails />,
  };

  useEffect(() => {
    dispatch(getEmployeeData(userDetails.id));
  }, [userDetails.id, dispatch]);
  return (
    <>
      <div className="flex flex-col">
        {/* Employee Profile */}
        <div className="flex flex-col pt-2 border-b border-b-gray-200">
          <div className="flex gap-3 items-center mb-2">
            <div className="flex justify-between w-[5rem] h-[5rem] rounded-[50%] overflow-hidden">
              <img
                src="/Images/dummy_userProfile.png"
                alt="user-profile-image"
              />
            </div>
            <div>
              <p className="font-bold">
                {employeeDetails?.name} (
                <span>{employeeDetails?.designation_name}</span>)
              </p>
              <p className="text-[.6rem]">{employeeDetails?.emp_code}</p>
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
