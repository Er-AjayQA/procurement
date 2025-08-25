import { useEmployeeTransferContext } from "../../../contextApis/useHrmsContextFile";

export const ApproversPopup = () => {
  const {
    data,
    tabType,
    updateId,
    handleTabClick,
    getAllData,
    handleComponentView,
  } = useEmployeeTransferContext();
  return (
    <div>
      {/* Overlay */}
      <div className="bg-black fixed w-full bottom-0 top-0 end-0 start-0"></div>

      {/* Approver Data */}
      {/* List Form */}
      <div className="p-3 h-[86%]">
        <div className="grid grid-cols-5 border-b border-gray-300 gap-2">
          <div className="text-[.8rem] font-bold p-2">S.No.</div>
          <div className="text-[.8rem] font-bold p-2">Approver Name</div>
          <div className="text-[.8rem] font-bold p-2">Acted On</div>
          <div className="text-[.8rem] font-bold p-2">Status</div>
          <div className="text-[.8rem] font-bold p-2">Remark</div>
        </div>
        <div className="">
          {data?.workflow_Details.length > 0 ? (
            data?.workflow_Details.map((list, i) => {
              return (
                <div
                  key={list?.id}
                  className="grid grid-cols-5 border-b border-gray-200 last:border-none gap-2"
                >
                  <div className="flex items-center p-2 text-[.8rem]">
                    {i + 1}.
                  </div>
                  <div className="flex items-center p-2 text-[.8rem]">
                    {list?.requested_for_user_title}
                    {list?.requested_for_user_name}
                  </div>
                  <div className="flex items-center p-2 text-[.8rem]">
                    {list?.acted_on || "N/A"}
                  </div>
                  <div className="flex items-center p-2 text-[.8rem] overflow-hidden">
                    {list?.approver_status || "N/A"}
                  </div>
                  <div className="flex items-center p-2 text-[.8rem]">
                    {list?.comments || "N/A"}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="grid border-b border-gray-200 last:border-none">
              <div className="p-5 text-[.8rem]">
                <p className="text-center">No Records Found</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
