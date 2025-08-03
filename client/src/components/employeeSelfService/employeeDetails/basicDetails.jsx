import { useSelector } from "react-redux";

export const EmployeeBasicDetails = () => {
  const { employeeDetails } = useSelector((state) => state.employee);
  return (
    <>
      <div className="flex gap-3">
        <div className="grid grid-cols-3 gap-5 basis-[80%] justify-around">
          <div className="flex flex-col justify-center">
            <label className="text-[.8rem]">Employee Code</label>
            <p className="text-[.7rem]">{employeeDetails?.emp_code || "N/A"}</p>
          </div>
          <div>
            <label className="text-[.8rem]">Name</label>
            <p className="text-[.7rem]">{employeeDetails?.name || "N/A"}</p>
          </div>
          <div>
            <label className="text-[.8rem]">DOB</label>
            <p className="text-[.7rem]">{employeeDetails?.dob || "N/A"}</p>
          </div>
          <div>
            <label className="text-[.8rem]">Gender</label>
            <p className="text-[.7rem]">{employeeDetails?.gender || "N/A"}</p>
          </div>
          <div>
            <label className="text-[.8rem]">Contact Number</label>
            <p className="text-[.7rem]">
              {employeeDetails?.contact_no || "N/A"}
            </p>
          </div>
          <div>
            <label className="text-[.8rem]">Alt Contact Number</label>
            <p className="text-[.7rem]">
              {employeeDetails?.alt_contact_no || "N/A"}
            </p>
          </div>
          <div>
            <label className="text-[.8rem]">Personal Email</label>
            <p className="text-[.7rem]">
              {employeeDetails?.personal_email || "N/A"}
            </p>
          </div>
          <div>
            <label className="text-[.8rem]">Personal Email</label>
            <p className="text-[.7rem]">
              {employeeDetails?.personal_email || "N/A"}
            </p>
          </div>
        </div>

        {/* Acheivements */}
        <div className="flex-grow shadow-md p-2 rounded-md">
          <p>Achievements</p>
        </div>
      </div>
    </>
  );
};
