import { useSelector } from "react-redux";

export const EmployeePersonalDetails = () => {
  const { employeeDetails } = useSelector((state) => state.employee);
  return (
    <>
      <div className="flex flex-col gap-5">
        {/* Present Address */}
        <div className="shadow-lg rounded-md">
          <div className="bg-button-hover py-2 px-1 rounded-t-md">
            <h3 className="text-white text-xs">Present Address</h3>
          </div>
          <div className="grid grid-cols-4 p-3 gap-3">
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Country</label>
              <p className="text-[.7rem]">
                {employeeDetails?.present_country_name || "N/A"}
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">State</label>
              <p className="text-[.7rem]">
                {employeeDetails?.present_state_name || "N/A"}
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">City</label>
              <p className="text-[.7rem]">
                {employeeDetails?.present_city_name || "N/A"}
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Address</label>
              <p className="text-[.7rem]">
                {employeeDetails?.present_address || "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Permanent Address */}
        <div className="shadow-lg rounded-md">
          <div className="bg-button-hover py-2 px-1 rounded-t-md">
            <h3 className="text-white text-xs">Permanent Address</h3>
          </div>
          <div className="grid grid-cols-4 p-3 gap-3">
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Country</label>
              <p className="text-[.7rem]">
                {employeeDetails?.permanent_country_name || "N/A"}
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">State</label>
              <p className="text-[.7rem]">
                {employeeDetails?.permanent_state_name || "N/A"}
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">City</label>
              <p className="text-[.7rem]">
                {employeeDetails?.permanent_city_name || "N/A"}
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Address</label>
              <p className="text-[.7rem]">
                {employeeDetails?.permanent_address || "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Personal Details */}
        <div className="shadow-lg rounded-md">
          <div className="bg-button-hover py-2 px-1 rounded-t-md">
            <h3 className="text-white text-xs">Personal Details</h3>
          </div>
          <div className="grid grid-cols-4 p-3 gap-3">
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Nationality</label>
              <p className="text-[.7rem]">
                {employeeDetails?.nationality || "N/A"}
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">State</label>
              <p className="text-[.7rem]">
                {employeeDetails?.personal_state_name || "N/A"}
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">City</label>
              <p className="text-[.7rem]">
                {employeeDetails?.personal_city_name || "N/A"}
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">ID Number</label>
              <p className="text-[.7rem]">
                {employeeDetails?.id_number || "N/A"}
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">ID Issue Date</label>
              <p className="text-[.7rem]">
                {employeeDetails?.id_issue_date || "N/A"}
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">ID Expiry Date</label>
              <p className="text-[.7rem]">
                {employeeDetails?.id_exp_date || "N/A"}
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">DIRE Number</label>
              <p className="text-[.7rem]">
                {employeeDetails?.dire_number || "N/A"}
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Driving License No.</label>
              <p className="text-[.7rem]">
                {employeeDetails?.driving_license || "N/A"}
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Passport No.</label>
              <p className="text-[.7rem]">
                {employeeDetails?.passport_number || "N/A"}
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Passport Issue Date</label>
              <p className="text-[.7rem]">
                {employeeDetails?.passport_issue_date || "N/A"}
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Passport Expiry Date</label>
              <p className="text-[.7rem]">
                {employeeDetails?.passport_exp_date || "N/A"}
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Blood Group</label>
              <p className="text-[.7rem]">
                {employeeDetails?.blood_group || "N/A"}
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Tax number</label>
              <p className="text-[.7rem]">
                {employeeDetails?.tax_number || "N/A"}
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Marital Status</label>
              <p className="text-[.7rem]">
                {employeeDetails?.marital_status || "N/A"}
              </p>
            </div>
            {employeeDetails?.marital_status && (
              <div className="flex flex-col gap-2 justify-center">
                <label className="text-[.8rem]">Spouse Name</label>
                <p className="text-[.7rem]">
                  {employeeDetails?.spouse_name || "N/A"}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Family Details */}
        <div className="shadow-lg rounded-md">
          <div className="bg-button-hover py-2 px-1 rounded-t-md">
            <h3 className="text-white text-xs">Family Details</h3>
          </div>
          <div className="p-3 overflow-x-auto">
            <div className="min-w-full">
              <div className="grid grid-cols-7  border-b border-b-gray-300 pb-2">
                <div className="text-xs font-bold">S.No.</div>
                <div className="text-xs font-bold">Member Name</div>
                <div className="text-xs font-bold">DOB</div>
                <div className="text-xs font-bold">Relation Type</div>
                <div className="text-xs font-bold">Contact No.</div>
                <div className="text-xs font-bold">Remark</div>
                <div className="text-xs font-bold">Emergency Contact</div>
              </div>

              <div>
                {employeeDetails?.family_details.length > 0 ? (
                  employeeDetails?.family_details.map((family, i) => {
                    return (
                      <div
                        key={family.id}
                        className="grid grid-cols-7 border-b border-b-gray-200 py-2 last:border-none"
                      >
                        <div className="text-xs flex items-center">{i + 1}</div>
                        <div className="text-xs flex items-center">
                          {family.member_name}
                        </div>
                        <div className="text-xs flex items-center">
                          {family.dob}
                        </div>
                        <div className="text-xs flex items-center">
                          {family.relation_type}
                        </div>
                        <div className="text-xs flex items-center">
                          {family.contact_number}
                        </div>
                        <div className="text-xs flex items-center">
                          {family.remark}
                        </div>
                        <div className="text-xs flex items-center justify-center">
                          {family?.selected_as_emergency ? (
                            <span className="text-green-400 text-xs font-bold">
                              Yes
                            </span>
                          ) : (
                            <span className="text-red-400 text-xs font-bold">
                              No
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div>
                    <p className="text-center text-sm p-3">No Records Found</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Previous Employer Details */}
        <div className="shadow-lg rounded-md">
          <div className="bg-button-hover py-2 px-1 rounded-t-md">
            <h3 className="text-white text-xs">Previous Employement Details</h3>
          </div>
          <div className="p-3 overflow-x-auto">
            <div className="min-w-full">
              <div className="grid grid-cols-7 border-b border-b-gray-300 pb-2">
                <div className="text-xs font-bold">S.No.</div>
                <div className="text-xs font-bold">Company Name</div>
                <div className="text-xs font-bold">From Date</div>
                <div className="text-xs font-bold">To Date</div>
                <div className="text-xs font-bold">Last Drawn Salary</div>
                <div className="text-xs font-bold">Reason of Leaving</div>
                <div className="text-xs font-bold">Location</div>
              </div>

              <div>
                {employeeDetails?.previous_employer_details.length > 0 ? (
                  employeeDetails?.previous_employer_details.map(
                    (company, i) => {
                      return (
                        <div
                          key={company.id}
                          className="grid grid-cols-7 border-b border-b-gray-200 py-2 last:border-none"
                        >
                          <div className="text-xs flex items-center">
                            {i + 1}
                          </div>
                          <div className="text-xs flex items-center">
                            {company.company_name}
                          </div>
                          <div className="text-xs flex items-center">
                            {company.from_date}
                          </div>
                          <div className="text-xs flex items-center">
                            {company.to_date}
                          </div>
                          <div className="text-xs flex items-center">
                            {company.last_drawn_salary}
                          </div>
                          <div className="text-xs flex items-center">
                            {company.reason_of_leaving}
                          </div>
                          <div className="text-xs flex items-center">
                            {company.location}
                          </div>
                        </div>
                      );
                    }
                  )
                ) : (
                  <div>
                    <p className="text-center text-sm p-3">No Records Found</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
