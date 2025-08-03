import { useSelector } from "react-redux";

export const EmployeeSalaryDetails = () => {
  const { employeeDetails } = useSelector((state) => state.employee);
  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          {/* Salary Details */}
          <div className="shadow-lg rounded-md">
            <div className="bg-button-hover py-2 px-1 rounded-t-md">
              <h3 className="text-white text-xs">Salary Details</h3>
            </div>
            <div className="grid grid-cols-3 p-3 gap-3">
              <div className="flex flex-col justify-center">
                <label className="text-[.8rem]">Working Shift</label>
                <p className="text-[.7rem]">
                  {employeeDetails?.shift_name || "N/A"}
                </p>
              </div>
              <div className="flex flex-col justify-center">
                <label className="text-[.8rem]">Base Salary</label>
                <p className="text-[.7rem]">
                  {employeeDetails?.base_salary || "N/A"}
                </p>
              </div>
              <div>
                <label className="text-[.8rem]">Daily Working Hrs</label>
                <p className="text-[.7rem]">
                  {employeeDetails?.daily_working_hours || "N/A"}
                </p>
              </div>
              <div>
                <label className="text-[.8rem]">Salary/Day</label>
                <p className="text-[.7rem]">
                  {employeeDetails?.salary_per_day || "N/A"}
                </p>
              </div>
              <div>
                <label className="text-[.8rem]">Salary/Hour</label>
                <p className="text-[.7rem]">
                  {employeeDetails?.salary_per_hour || "N/A"}
                </p>
              </div>
              <div>
                <label className="text-[.8rem]">Total Monthly Hours</label>
                <p className="text-[.7rem]">
                  {employeeDetails?.total_monthly_hours || "N/A"}
                </p>
              </div>
              <div>
                <label className="text-[.8rem]">Weekly Hours</label>
                <p className="text-[.7rem]">
                  {employeeDetails?.weekly_hours || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Allowance Details */}
          <div className="shadow-lg rounded-md">
            <div className="bg-button-hover py-2 px-1 rounded-t-md">
              <h3 className="text-white text-xs">Allowance Details</h3>
            </div>
            <div className="p-3 overflow-x-auto">
              <div className="min-w-full">
                <div className="grid grid-cols-3  border-b border-b-gray-300 pb-2">
                  <div className="text-xs font-bold">S.No.</div>
                  <div className="text-xs font-bold">Allowance Name</div>
                  <div className="text-xs font-bold">Amount</div>
                </div>

                <div>
                  {employeeDetails?.allowance_details.length > 0 ? (
                    employeeDetails?.allowance_details.map((allowance, i) => {
                      return (
                        <div
                          key={allowance.id}
                          className="grid grid-cols-3 border-b border-b-gray-200 py-2 last:border-none"
                        >
                          <div className="text-xs flex items-center">
                            {i + 1}
                          </div>
                          <div className="text-xs flex items-center">
                            {allowance.ALLOWANCE_MASTER.name}
                          </div>
                          <div className="text-xs flex items-center">
                            {allowance.amount}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div>
                      <p className="text-center text-sm p-3">
                        No Records Found
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* History of Salary Revision Details */}
        <div className="shadow-lg rounded-md">
          <div className="bg-button-hover py-2 px-1 rounded-t-md">
            <h3 className="text-white text-xs">History of Salary Revision</h3>
          </div>
          <div className="p-3 overflow-x-auto">
            <div className="min-w-full">
              <div className="grid grid-cols-7 border-b border-b-gray-300 pb-2">
                <div className="text-xs font-bold">S.No.</div>
                <div className="text-xs font-bold">Year</div>
                <div className="text-xs font-bold">Month</div>
                <div className="text-xs font-bold">New Salary</div>
                <div className="text-xs font-bold">Old Salary</div>
                <div className="text-xs font-bold">Revision %</div>
                <div className="text-xs font-bold">Remark</div>
              </div>

              <div>
                {employeeDetails?.salary_history.length > 0 ? (
                  employeeDetails?.salary_history.map((salary, i) => {
                    return (
                      <div
                        key={salary.id}
                        className="grid grid-cols-7 border-b border-b-gray-200 py-2 last:border-none"
                      >
                        <div className="text-xs flex items-center">{i + 1}</div>
                        <div className="text-xs flex items-center">
                          {salary.year}
                        </div>
                        <div className="text-xs flex items-center">
                          {salary.month}
                        </div>
                        <div className="text-xs flex items-center">
                          {salary.new_salary}
                        </div>
                        <div className="text-xs flex items-center">
                          {salary.old_salary}
                        </div>
                        <div className="text-xs flex items-center">
                          {salary.revision_percent}
                        </div>
                        <div className="text-xs flex items-center">
                          {salary.remark}
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
      </div>
    </>
  );
};
