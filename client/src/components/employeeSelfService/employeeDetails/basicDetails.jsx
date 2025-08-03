import { useSelector } from "react-redux";

export const EmployeeBasicDetails = () => {
  const { employeeDetails } = useSelector((state) => state.employee);
  return (
    <>
      <div className="flex gap-3">
        <div className="grid grid-cols-3 gap-5 basis-[80%] justify-around shadow-lg rounded-md px-3 pb-4">
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
          <div>
            <label className="text-[.8rem]">Official Email</label>
            <p className="text-[.7rem]">
              {employeeDetails?.official_email || "N/A"}
            </p>
          </div>
          <div>
            <label className="text-[.8rem]">Branch</label>
            <p className="text-[.7rem]">
              {employeeDetails?.branch_name || "N/A"}
            </p>
          </div>
          <div>
            <label className="text-[.8rem]">Role</label>
            <p className="text-[.7rem]">
              {employeeDetails?.role_name || "N/A"}
            </p>
          </div>
          <div>
            <label className="text-[.8rem]">Reporting Manager</label>
            <p className="text-[.7rem]">
              {employeeDetails?.reporting_manager || "N/A"}
            </p>
          </div>
          <div>
            <label className="text-[.8rem]">Department</label>
            <p className="text-[.7rem]">
              {employeeDetails?.department_name || "N/A"}
            </p>
          </div>
          <div>
            <label className="text-[.8rem]">Designation</label>
            <p className="text-[.7rem]">
              {employeeDetails?.designation_name || "N/A"}
            </p>
          </div>
          <div>
            <label className="text-[.8rem]">Employement Type</label>
            <p className="text-[.7rem]">
              {employeeDetails?.employment_type || "N/A"}
            </p>
          </div>
        </div>

        {/* Achievements */}
        <div className="flex-grow shadow-lg p-2 rounded-md">
          <p>Achievements</p>
        </div>
      </div>
    </>
  );
};
