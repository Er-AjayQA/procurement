import { useMyTicketsInboxContext } from "../../../../contextApis/useTicketContextFile";

export const TicketHistoryDetails = () => {
  const { data } = useMyTicketsInboxContext();
  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="bg-button-hover py-2 px-1 rounded-t-md">
          <h3 className="text-white text-xs">Ticket History</h3>
        </div>
        <div className="basis-[90%] justify-around shadow-lg rounded-md pb-4 mx-auto">
          {/* Table Headers */}
          <div className="flex bg-gray-200">
            <div className="w-[100px] px-2 py-2 text-center font-bold border-e border-e-gray-300">
              <label className="text-[.8rem]">S.No.</label>
            </div>
            <div className="w-[300px] px-2 py-2 text-center font-bold border-e border-e-gray-300">
              <label className="text-[.8rem]">Action Taken</label>
            </div>
            <div className="w-[200px] px-2 py-2 text-center font-bold border-e border-e-gray-300">
              <label className="text-[.8rem]">Acted On</label>
            </div>
            <div className="w-[150px] px-2 py-2 text-center font-bold border-e border-e-gray-300">
              <label className="text-[.8rem]">Executive Name</label>
            </div>
            <div className="w-[250px] px-2 py-2 text-center font-bold border-e border-e-gray-300">
              <label className="text-[.8rem]">Remark by Executive</label>
            </div>
            <div className="w-[150px] px-2 py-2 text-center font-bold">
              <label className="text-[.8rem]">Current Status</label>
            </div>
          </div>

          {/* Table Body */}

          {data?.history_detail?.map((list, i) => {
            return (
              <div className="flex" key={i}>
                <div className="flex items-center justify-center w-[100px] px-2 py-2 border-e border-e-gray-200 border-b border-b-gray-200">
                  <p className="text-[.7rem]">{i + 1}</p>
                </div>
                <div className="w-[300px] px-2 py-2 border-e border-e-gray-200 border-b border-b-gray-200">
                  <p className="text-[.7rem]">{list?.action_taken || "N/A"} </p>
                </div>
                <div className="flex items-center justify-center w-[200px] px-2 py-2 border-e border-e-gray-200 border-b border-b-gray-200">
                  <p className="text-[.7rem]">{list?.action_date || "N/A"} </p>
                </div>
                <div
                  className={`flex items-center justify-center w-[150px] px-2 py-2 border-e border-e-gray-200 border-b border-b-gray-200`}
                >
                  <p className="text-[.7rem]">
                    {list?.executive_name || "N/A"}
                  </p>
                </div>
                <div
                  className={`flex items-center w-[250px] px-2 py-2 border-e border-e-gray-200 border-b border-b-gray-200 ${
                    list?.executive_remark ? "" : "justify-center"
                  }`}
                >
                  <p className="text-[.7rem]">
                    {list?.executive_remark || "N/A"}
                  </p>
                </div>
                <div className="flex items-center justify-center w-[150px] px-2 py-2 border-b border-b-gray-200">
                  <p className="text-[.7rem]">
                    {list?.current_status || "N/A"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
