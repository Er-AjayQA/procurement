import { useProjectConfigurationsContext } from "../../../../contextApis/useProjectContextFile";

export const ProjectAssignedUserDetails = () => {
  const { data, formatDateTime } = useProjectConfigurationsContext();
  return (
    <>
      <div className="flex flex-col">
        <div className="bg-button-hover py-2 px-1 rounded-t-md">
          <h3 className="text-white text-xs font-bold">Assigned Users List</h3>
        </div>
        <div className="basis-[80%] justify-around shadow-lg rounded-md pb-4">
          {/* Table Headers */}
          <table className="w-full mx-auto">
            <thead>
              <tr className="bg-gray-200 border border-gray-300">
                <th className="text-xs py-3 px-2">S.No</th>
                <th className="text-xs py-3 px-2">Employee Code</th>
                <th className="text-xs py-3 px-2">Employee Name</th>
                <th className="text-xs py-3 px-2">Email Id</th>
                <th className="text-xs py-3 px-2">Contact Number</th>
              </tr>
            </thead>
            <tbody>
              {data?.assignedUsersList.length > 0 ? (
                data?.assignedUsersList.map((item, i) => {
                  return (
                    <tr className="border border-gray-300 hover:bg-gray-100">
                      <td className="text-center text-xs py-3 px-2">
                        {i + 1}.
                      </td>
                      <td className="text-center text-xs py-3 px-2">
                        {item?.user_emp_code || "N/A"}
                      </td>
                      <td className="text-center text-xs py-3 px-2">
                        {item?.user_id
                          ? `${item?.user_title} ${item?.user_name}`
                          : "N/A"}
                      </td>
                      <td className="text-center text-xs py-3 px-2">
                        {item?.official_email || "N/A"}
                      </td>
                      <td className="text-center text-xs py-3 px-2">
                        {item?.contact_code
                          ? `${item?.contact_code}-${item?.contact_no}`
                          : "N/A"}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="text-center text-sm py-3 px-2">
                    No Records Found!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
