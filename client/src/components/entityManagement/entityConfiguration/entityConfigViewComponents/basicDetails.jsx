import { useEntityConfigContext } from "../../../../contextApis/useEntityContextFile";

export const EntityBasicDetails = () => {
  const { data } = useEntityConfigContext();
  return (
    <>
      <div className="flex gap-3">
        <div className="flex flex-col gap-3 basis-[70%]">
          <div className="bg-button-hover py-2 px-1 rounded-t-md">
            <h3 className="text-white text-xs">Basic Information</h3>
          </div>
          <div className="grid grid-cols-3 gap-5 basis-[80%] justify-around shadow-lg rounded-md px-3 pb-4">
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Employee Code</label>
              <p className="text-[.7rem]">{data?.emp_code || "N/A"}</p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Name</label>
              <p className="text-[.7rem]">
                {data?.title} {data?.name}
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">DOB</label>
              <p className="text-[.7rem]">{data?.dob || "N/A"}</p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Gender</label>
              <p className="text-[.7rem]">{data?.gender || "N/A"}</p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Contact Number</label>
              <p className="text-[.7rem]">
                {data?.contact_code}-{data?.contact_no}
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Alt Contact Number</label>
              <p className="text-[.7rem]">
                {data?.alt_contact_no
                  ? `${data?.alt_contact_code}-${data?.alt_contact_no}`
                  : "N/A"}
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Personal Email</label>
              <p className="text-[.7rem]">{data?.personal_email || "N/A"}</p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Personal Email</label>
              <p className="text-[.7rem]">{data?.personal_email || "N/A"}</p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Official Email</label>
              <p className="text-[.7rem]">{data?.official_email || "N/A"}</p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Branch</label>
              <p className="text-[.7rem]">{data?.branch_name || "N/A"}</p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Role</label>
              <p className="text-[.7rem]">{data?.role_name || "N/A"}</p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Reporting Manager</label>
              <p className="text-[.7rem]">{data?.reporting_manager || "N/A"}</p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Department</label>
              <p className="text-[.7rem]">{data?.department_name || "N/A"}</p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Area</label>
              <p className="text-[.7rem]">{data?.area_name || "N/A"}</p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Designation</label>
              <p className="text-[.7rem]">{data?.designation_name || "N/A"}</p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Employement Type</label>
              <p className="text-[.7rem]">{data?.employment_type || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="flex-grow shadow-lg rounded-md">
          <div className="bg-button-hover py-2 px-1 rounded-t-md">
            <h3 className="text-white text-xs">Achievements</h3>
          </div>
        </div>
      </div>
    </>
  );
};
