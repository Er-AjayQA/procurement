import { useAllTicketsContext } from "../../../../contextApis/useTicketContextFile";

export const TicketBasicDetails = () => {
  const { data } = useAllTicketsContext();
  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="bg-button-hover py-2 px-1 rounded-t-md">
          <h3 className="text-white text-xs">Basic Details</h3>
        </div>
        <div className="grid grid-cols-3 gap-5 basis-[80%] justify-around shadow-lg rounded-md px-3 pb-4">
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[.8rem]">Ticket Type</label>
            <p className="text-[.7rem]">
              {data?.ticket_type ? `For ${data?.ticket_type}` : "N/A"}
            </p>
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[.8rem]">Employee Name</label>
            <p className="text-[.7rem]">
              {data?.created_for_userTitle} {data?.created_for_userName} -{" "}
              {data?.created_for_user_code}
            </p>
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[.8rem]">Raised For (Department)</label>
            <p className="text-[.7rem]">
              {data?.created_for_deptName || "N/A"}
            </p>
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[.8rem]">Ticket Category</label>
            <p className="text-[.7rem]">
              {data?.ticket_category_name || "N/A"}
            </p>
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[.8rem]">Priority</label>
            <p className="text-[.7rem]">{data?.ticket_priority || "N/A"}</p>
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[.8rem]">Current Status</label>
            <p
              className={`text-[.7rem] font-bold ${
                (data?.ticket_status === "OPEN" && "text-green-600") ||
                (data?.ticket_status === "CLOSE" && "text-red-600") ||
                (data?.ticket_status === "ESCALATED" && "text-yellow-600") ||
                (data?.ticket_status === "PICK" && "text-blue-600") ||
                (data?.ticket_status === "ASSIGNED" && "text-pink-600")
              }`}
            >
              {data?.ticket_status || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
