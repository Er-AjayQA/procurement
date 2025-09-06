import { useRegisteredEventsContext } from "../../../../contextApis/useEventContextFile";

export const EventBasicDetails = () => {
  const { data, formatDateTime } = useRegisteredEventsContext();
  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="bg-button-hover py-2 px-1 rounded-t-md">
          <h3 className="text-white text-xs">Basic Details</h3>
        </div>
        <div className="grid grid-cols-3 gap-5 basis-[80%] justify-around shadow-lg rounded-md px-3 pb-4">
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[.8rem]">Event Type</label>
            <p className="text-[.7rem]">
              {data?.event_type ? `${data?.event_type}` : "N/A"}
            </p>
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[.8rem]">Event Category</label>
            <p className="text-[.7rem]">{data?.event_category_name || "N/A"}</p>
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[.8rem]">Meeting Link</label>
            <p className="text-[.7rem]">{data?.event_meet_link || "N/A"}</p>
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[.8rem]">From</label>
            <p className="text-[.7rem]">
              {data?.event_start_date
                ? formatDateTime(data?.event_start_date)
                : "N/A"}
            </p>
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[.8rem]">To</label>
            <p className="text-[.7rem]">
              {data?.event_end_date
                ? formatDateTime(data?.event_end_date)
                : "N/A"}
            </p>
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[.8rem]">Current Status</label>
            <p
              className={`text-[.7rem] font-bold ${
                (data?.status === "DRAFT" && "text-yellow-600") ||
                (data?.status === "PUBLISHED" && "text-green-600") ||
                (data?.status === "CANCELLED" && "text-red-600") ||
                (data?.status === "FINISHED" && "text-blue-600")
              }`}
            >
              {data?.status || "N/A"}
            </p>
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[.8rem]">Description</label>
            <p className="text-[.7rem]">{data?.event_description || "N/A"}</p>
          </div>
        </div>
      </div>
    </>
  );
};
