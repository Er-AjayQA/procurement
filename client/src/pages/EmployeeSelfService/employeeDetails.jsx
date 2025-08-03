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

  useEffect(() => {
    dispatch(getEmployeeData(userDetails.id));
  }, [userDetails.id, dispatch]);
  return (
    <>
      <div className="flex flex-col">
        {/* Employee Profile */}
        <div className="flex flex-col py-2 border-b border-b-gray-200">
          <div className="flex gap-3 items-center mb-2">
            <div className="flex justify-between w-[5rem] h-[5rem] rounded-[50%] overflow-hidden">
              <img
                src={`${
                  employeeDetails?.userImage !== null
                    ? employeeDetails?.userImage
                    : "/Images/dummy_userProfile.png"
                }`}
                alt="user-profile-image"
              />
            </div>
            <div>
              <p className="font-bold">{employeeDetails?.name}</p>
              <p className="text-[.6rem]">{employeeDetails?.emp_code}</p>
            </div>
          </div>
          {/* Employee Tabs */}
          <div>
            <ul className="flex gap-4">
              <li
                className="text-[.8rem] cursor-pointer"
                onClick={() => handleTabClick("basicDetails")}
              >
                Basic Details
              </li>
              <li
                className="text-[.8rem] cursor-pointer"
                onClick={() => handleTabClick("personalDetails")}
              >
                Personal Details
              </li>
              <li
                className="text-[.8rem] cursor-pointer"
                onClick={() => handleTabClick("salaryDetails")}
              >
                Salary Details
              </li>
              <li
                className="text-[.8rem] cursor-pointer"
                onClick={() => handleTabClick("paymentDetails")}
              >
                Payment Details
              </li>
              <li
                className="text-[.8rem] cursor-pointer"
                onClick={() => handleTabClick("documentDetails")}
              >
                Document Details
              </li>
              <li
                className="text-[.8rem] cursor-pointer"
                onClick={() => handleTabClick("contractDetails")}
              >
                Contract Details
              </li>
            </ul>
          </div>
        </div>

        {/* Emplyee Details Form */}
        <div className="py-2">
          {(tabType === "basicDetails" && <EmployeeBasicDetails />) ||
            (tabType === "personalDetails" && <EmployeePersonalDetails />) ||
            (tabType === "salaryDetails" && <EmployeeSalaryDetails />) ||
            (tabType === "paymentDetails" && <EmployeePaymentDetails />) ||
            (tabType === "documentDetails" && <EmployeeDocumentDetails />) ||
            (tabType === "contractDetails" && <EmployeeContractDetails />)}
        </div>
      </div>
    </>
  );
};
